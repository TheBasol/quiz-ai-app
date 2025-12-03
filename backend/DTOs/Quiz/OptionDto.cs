namespace quiz_ai_app.DTOs;

public class OptionDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
}