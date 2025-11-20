using quiz_ai_app.Utils;
using quiz_ai_app.Settings;
using System.Text.Json;

namespace quiz_ai_app.Services;


public class CreateQuizOpenRouterService: ICreateQuiz
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<CreateQuizOpenRouterService> _logger;
    private readonly HttpClient _httpClient;

    public CreateQuizOpenRouterService(IConfiguration configuration, ILogger<CreateQuizOpenRouterService> logger, HttpClient httpClient)
    {
        _configuration = configuration;
        _logger = logger;
        _httpClient = httpClient;
    }

    public async Task<string> GenerateQuizQuestionsAsync(string topic, DifficultyLevel difficulty, int numberOfQuestions,string language= "English", string? category = null, string? focusArea = null)
    {
        var difficultyString = difficulty.ToString();
        
        var systemPrompt = AiPromptGenerator.GetSystemPrompt(numberOfQuestions);
        
        var userPrompt = AiPromptGenerator.GetUserPrompt(
            topic: topic,
            category: category ?? topic,
            difficulty: difficultyString,
            numberOfQuestions: numberOfQuestions,
            language: language,
            focusArea: focusArea
        );
        
        foreach (var model in AiModels.AvailableModels)
        {
            try
            {
                _logger.LogInformation($"Attempting to generate quiz with model: {model}");
                var result = await TryGenerateWithModelAsync(model, systemPrompt, userPrompt);
                
                if (IsValidJsonResponse(result))
                {
                    _logger.LogInformation($"Quiz successfully generated with model: {model}");
                    return result;
                }
                else
                {
                    _logger.LogWarning($"Model {model} returned invalid JSON");
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning($"Error with model {model}: {ex.Message}");
            }
        }

        throw new InvalidOperationException("Could not generate quiz. All models failed or returned invalid responses.");
    }

    private async Task<string> TryGenerateWithModelAsync(string model, string systemPrompt, string userPrompt)
    {
        var apiKey = _configuration["OpenRouterApi:ApiKey"];
        var urlBase = _configuration["OpenRouterApi:UrlBase"];

        if (string.IsNullOrEmpty(apiKey))
        {
            throw new InvalidOperationException("OpenRouter API key not configured");
        }

        if (string.IsNullOrEmpty(urlBase))
        {
            throw new InvalidOperationException("OpenRouter UrlBase not configured");
        }
        
        var messages = new object[]
        {
            new { role = "system", content = systemPrompt },
            new { role = "user", content = userPrompt }
        };

        var payload = new
        {
            model = model,
            messages = messages
        };

        var jsonPayload = JsonSerializer.Serialize(payload);
        var content = new StringContent(jsonPayload, System.Text.Encoding.UTF8, "application/json");
        
        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
        _httpClient.DefaultRequestHeaders.Add("HTTP-Referer", "https://localhost");
        _httpClient.DefaultRequestHeaders.Add("X-Title", "Quiz AI App");
        
        var response = await _httpClient.PostAsync($"{urlBase}/chat/completions", content);
        
        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new InvalidOperationException($"OpenRouter API error: {response.StatusCode} - {errorContent}");
        }

        var responseContent = await response.Content.ReadAsStringAsync();
        
        var jsonResponse = JsonDocument.Parse(responseContent);
        var root = jsonResponse.RootElement;
        
        var messageContent = root
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        return messageContent ?? string.Empty;
    }

    private bool IsValidJsonResponse(string? response)
    {
        if (string.IsNullOrWhiteSpace(response))
            return false;

        try
        {
            var trimmed = response.Trim();
            
            if (!trimmed.StartsWith("{") || !trimmed.EndsWith("}"))
                return false;
            
            using var jsonDoc = JsonDocument.Parse(trimmed);
            var root = jsonDoc.RootElement;
            
            return root.TryGetProperty("questions", out var questionsElement) &&
                   questionsElement.ValueKind == JsonValueKind.Array &&
                   questionsElement.GetArrayLength() > 0;
        }
        catch (JsonException ex)
        {
            _logger.LogWarning($"Error validating JSON: {ex.Message}");
            return false;
        }
    }
}






