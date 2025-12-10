using quiz_ai_app.Entitys;

namespace quiz_ai_app.DTOs.User;

public class UserInsertDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string Username { get; set; }
}