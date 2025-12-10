using quiz_ai_app.Entitys;

namespace quiz_ai_app.DTOs.User;

public class UserDto
{
    public string Id { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public List<Quiz>? Quizzes { get; set; }
}