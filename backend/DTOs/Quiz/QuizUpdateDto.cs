using quiz_ai_app.Utils;

namespace quiz_ai_app.DTOs;

public class QuizUpdateDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public DifficultyLevel Difficulty { get; set; }
    public TimeSpan TimeLimit { get; set; }
    public List<QuestionDto> Questions { get; set; } = new();
}