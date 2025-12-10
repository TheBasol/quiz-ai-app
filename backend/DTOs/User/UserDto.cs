using quiz_ai_app.Entitys;

namespace quiz_ai_app.DTOs.User;

public class UserDto
{
    public DateTime DateOfBirth { get; set; }
    public List<Quiz> Quizzes { get; set; }
}