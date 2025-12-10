using quiz_ai_app.DTOs.User;

namespace quiz_ai_app.Services;

public interface IUserService
{
    Task<UserAuthResponseDto> Add(UserInsertDto credentialsUserDto);
    Task<UserDto> GetById(string userId);
    Task<UserDto> GetUserWithQuizzes(string userId);
    IEnumerable<UserDto> GetAll();
    Task<UserDto> Update(string userId, UserUpdateDto updateDto);
    Task<bool> Delete(string userId);
    Task<UserAuthResponseDto> Login(UserLoginDto loginDto);
}

