using quiz_ai_app.Utils;
using System.Text.Json;

namespace quiz_ai_app.Services;

public class CreateQuizOpenRouterService: ICreateQuizService
{
    private readonly ILogger<CreateQuizOpenRouterService> _logger;
    private readonly IGetAiModelsService _aiModelsService;
    private readonly HttpClient _httpClient;

    public CreateQuizOpenRouterService(ILogger<CreateQuizOpenRouterService> logger, HttpClient httpClient,
        IGetAiModelsService aiModelsService)
    {
        _logger = logger;
        _httpClient = httpClient;
        _aiModelsService = aiModelsService;
    }

    public async Task<string> GenerateQuizQuestionsAsync(string topic, DifficultyLevel difficulty, int numberOfQuestions, string? language = "English", string? category = null, string? focusArea = null)
    {
        var difficultyString = difficulty.ToString();
        
        var systemPrompt = AiPromptGenerator.GetSystemPrompt(numberOfQuestions);
        
        var userPrompt = AiPromptGenerator.GetUserPrompt(
            topic: topic,
            category: category ?? topic,
            difficulty: difficultyString,
            numberOfQuestions: numberOfQuestions,
            language: language ?? "English",
            focusArea: focusArea
        );
        
        var models = await _aiModelsService.GetModels();
        
        foreach (var model in models)
        {
            try
            {
                _logger.LogInformation("Attempting to generate quiz with model: {Model}", model);
                var result = await TryGenerateWithModelAsync(model, systemPrompt, userPrompt);
                
                if (IsValidJsonResponse(result))
                {
                    _logger.LogInformation("Quiz successfully generated with model: {Model}", model);
                    return result;
                }
                else
                {
                    _logger.LogWarning("Model {Model} returned invalid JSON", model);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Error with model {Model}: {Message}", model, ex.Message);
            }
        }

        throw new InvalidOperationException("Could not generate quiz. All models failed or returned invalid responses.");
    }

    private async Task<string> TryGenerateWithModelAsync(string model, string systemPrompt, string userPrompt)
    {
        var messages = new object[]
        {
            new { role = "system", content = systemPrompt },
            new { role = "user", content = userPrompt }
        };

        var payload = new
        {
            model,
            messages
        };

        var jsonPayload = JsonSerializer.Serialize(payload);
        var content = new StringContent(jsonPayload, System.Text.Encoding.UTF8, "application/json");
        
        var response = await _httpClient.PostAsync("chat/completions", content);
        
        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new InvalidOperationException($"OpenRouter API error: {response.StatusCode} - {errorContent}");
        }


        var responseContent = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"Respuesta RAW de OpenRouter: {responseContent}");
        
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
            _logger.LogWarning("Error validating JSON: {Message}", ex.Message);
            return false;
        }
    }
}






