namespace QuizAiApp.Settings;

public static class AiModels
{
    private static readonly string[] _models = new string[]
    {
        "google/gemma-2-9b-it:free",
        "google/gemma-2-2b-it:free",
        "google/gemini-flash-1.5:free",
        "microsoft/phi-3-mini-128k-instruct:free",
        "microsoft/phi-3-medium-128k-instruct:free",
        "meta-llama/llama-3.1-8b-instruct:free",
        "meta-llama/llama-3.2-3b-instruct:free",
        "meta-llama/llama-3.2-1b-instruct:free",
        "qwen/qwen-2-7b-instruct:free",
        "qwen/qwen-2.5-7b-instruct:free",
        "deepseek/deepseek-r1:free",
    };

    public static readonly IReadOnlyList<string> AvailableModels = _models;
}