using quiz_ai_app.Utils;

namespace quiz_ai_app.Services;

public interface ICreateQuizService
{
    Task<string> GenerateQuizQuestionsAsync(string topic, DifficultyLevel difficulty, int numberOfQuestions, string? language= "English", string? category = null, string? focusArea = null);
}