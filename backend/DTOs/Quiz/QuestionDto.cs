namespace quiz_ai_app.DTOs;

public class QuestionDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public List<OptionDto> Options { get; set; } = new();
}