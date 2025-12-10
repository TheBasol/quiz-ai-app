using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using quiz_ai_app.DTOs.User;
using quiz_ai_app.Services;

namespace quiz_ai_app.Controller;

[ApiController]
[Route("api/users")]
public class UsersController: ControllerBase
{
    private IUserService _userService;
    
    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpPost("register")]
    public async Task<ActionResult<UserAuthResponseDto>> Register([FromBody] UserInsertDto credentialsUserDto)
    {
        var userAuthResponseDto = await _userService.Add(credentialsUserDto);
        return Ok(userAuthResponseDto);
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<UserAuthResponseDto>> Login([FromBody] UserLoginDto loginDto)
    {
        var userAuthResponseDto = await _userService.Login(loginDto);
        
        return Ok(userAuthResponseDto);
    }
    
    [HttpGet]
    [Authorize]
    public ActionResult<IEnumerable<UserDto>> GetAll()
    {
        var users = _userService.GetAll();
        return Ok(users);
    }
    
    [HttpGet("{userId}")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetById(string userId)
    {
        var user = await _userService.GetById(userId);
        return Ok(user);
    }
    
    [HttpGet("{userId}/with-quizzes")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetUserWithQuizzes(string userId)
    {
        var user = await _userService.GetUserWithQuizzes(userId);
        return Ok(user);
    }
    
    [HttpPut("{userId}")]
    [Authorize]
    public async Task<ActionResult<UserDto>> Update(string userId, [FromBody] UserUpdateDto updateDto)
    {
        var user = await _userService.Update(userId, updateDto);
        return Ok(user);
    }
    
    [HttpDelete("{userId}")]
    [Authorize]
    public async Task<ActionResult<bool>> Delete(string userId)
    {
        var result = await _userService.Delete(userId);
        return Ok(result);
    }
}