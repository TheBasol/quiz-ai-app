namespace quiz_ai_app.DTOs.User;

public class UserAuthResponseDto
{
    public string Token { get; set; }
    public DateTime Expiration { get; set; }
}