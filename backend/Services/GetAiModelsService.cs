namespace quiz_ai_app.Services;

public class GetAiModelsService : IGetAiModelsService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<GetAiModelsService> _logger;
    
    public GetAiModelsService(HttpClient httpClient, ILogger<GetAiModelsService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }
    
    public async Task<IEnumerable<string>> GetModels()
    {
        var response = await _httpClient.GetAsync("/api/v1/models");

        var content = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"OpenRouter API error: {response.StatusCode} - {content}");
        }


        var trimmedContent = content.Trim();
        if (!trimmedContent.StartsWith("{") && !trimmedContent.StartsWith("["))
        {
            throw new InvalidOperationException($"Expected JSON response but got: {trimmedContent.Substring(0, Math.Min(100, trimmedContent.Length))}");
        }

        using var jsonDoc = System.Text.Json.JsonDocument.Parse(content);
        var root = jsonDoc.RootElement;
        var models = root.GetProperty("data").EnumerateArray()
            .Select(m => m.GetProperty("id").GetString() ?? "")
            .Where(id => !string.IsNullOrEmpty(id))
            .ToList();

        var topModels = models
            .Where(id => id.EndsWith(":free", StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(id =>
            {
                if (id.Contains("llama-3.1-70b", StringComparison.OrdinalIgnoreCase)) return 50;
                if (id.Contains("qwen-2.5-72b", StringComparison.OrdinalIgnoreCase)) return 45;
                if (id.Contains("gemini-flash-1.5", StringComparison.OrdinalIgnoreCase)) return 40;
                if (id.Contains("llama-3.1-8b", StringComparison.OrdinalIgnoreCase)) return 30;
                if (id.Contains("llama-3.2-3b", StringComparison.OrdinalIgnoreCase)) return 20;
                
                return 0;
            })
            .Take(10)
            .ToList();


        foreach (var model in topModels)
        {
            Console.WriteLine(model);
        }
        
        return topModels;
    }
}