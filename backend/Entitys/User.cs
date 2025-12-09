using Microsoft.AspNetCore.Identity;

namespace quiz_ai_app.Entitys;

public class User: IdentityUser
{
    public DateTime DateOfBirth { get; set; }
    public List<Quiz> Quizzes { get; set; }
}