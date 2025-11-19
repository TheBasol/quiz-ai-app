using quiz_ai_app.Utils;

namespace quiz_ai_app.Services;

public interface ICreateQuiz
{
    Task<string> GenerateQuizQuestionsAsync(string topic, DifficultyLevel difficulty, int numberOfQuestions, string? category = null, string? focusArea = null);
}