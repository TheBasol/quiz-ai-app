using quiz_ai_app.Utils;

namespace quiz_ai_app.DTOs;

public class GenerateQuizRequest
{
    public string Topic { get; set; } = string.Empty;
    public DifficultyLevel Difficulty { get; set; } = DifficultyLevel.Medium;
    public int NumberOfQuestions { get; set; } = 5;
    public string? QuizName { get; set; }
    public string? Category { get; set; }
    public string? FocusArea { get; set; }
    public int? TimeLimit { get; set; }
}

