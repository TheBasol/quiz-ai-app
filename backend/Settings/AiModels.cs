namespace quiz_ai_app.Settings;

public static class AiModels
{
    private static readonly string[] _models = new string[]
    {
        "google/gemini-2.0-flash-exp:free",
        "google/gemini-2.0-flash-thinking-exp:free",
        "qwen/qwen-2.5-7b-instruct:free",
        "meta-llama/llama-3.1-8b-instruct:free",
        "meta-llama/llama-3.1-70b-instruct:free",
        "google/gemma-2-9b-it:free",
        "mistralai/mistral-nemo:free",
        "liquid/lfm-40b:free",
        "meta-llama/llama-3.2-3b-instruct:free",
        "meta-llama/llama-3.2-1b-instruct:free",
        "microsoft/phi-3.5-mini-128k-instruct:free",
        "nousresearch/hermes-3-llama-3.1-8b:free",
        "huggingfaceh4/zephyr-7b-beta:free",
        "openchat/openchat-7b:free",
        "gryphe/mythomax-l2-13b:free"
    };

    public static readonly IReadOnlyList<string> AvailableModels = _models;
}