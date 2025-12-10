using Microsoft.AspNetCore.Identity;

namespace quiz_ai_app.Entitys;

public class User: IdentityUser
{
    public DateTime DateOfBirth { get; set; }
    public virtual List<Quiz> Quizzes { get; set; } = new List<Quiz>();
}