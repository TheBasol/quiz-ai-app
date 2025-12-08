namespace quiz_ai_app.Services;

public interface IGetAiModelsService
{
    Task<IEnumerable<String>> GetModels();
}