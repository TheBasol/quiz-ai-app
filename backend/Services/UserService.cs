using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using quiz_ai_app.DTOs.User;
using quiz_ai_app.Entitys;

namespace quiz_ai_app.Services;

public class UserService : IUserService
{
    private UserManager<User> _userManager;
    private IConfiguration _configuration;
    private IMapper _mapper;
    
    public UserService(UserManager<User> userManager, IConfiguration configuration, IMapper mapper)
    {
        _userManager = userManager;
        _configuration = configuration;
        _mapper = mapper;
    }

    public async Task<UserAuthResponseDto> Add(UserInsertDto credentialsUserDto)
    {
        var user = new User
        {
            UserName = credentialsUserDto.Username,
            Email = credentialsUserDto.Email
        }; 
        
        var result = await _userManager.CreateAsync(user, credentialsUserDto.Password);
        
        if (result.Succeeded)
        {
            return await BuildToken(user);
        }
        
        throw new InvalidOperationException($"Error creating user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
    }

    public async Task<UserDto> GetById(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        
        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID {userId} not found.");
        }
        
        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto> GetUserWithQuizzes(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        
        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID {userId} not found.");
        }
        
        return _mapper.Map<UserDto>(user);
    }

    public IEnumerable<UserDto> GetAll()
    {
        var users = _userManager.Users.ToList();
        return _mapper.Map<List<UserDto>>(users);
    }

    public async Task<UserDto> Update(string userId, UserUpdateDto updateDto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        
        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID {userId} not found.");
        }
        
        if (!string.IsNullOrEmpty(updateDto.Username))
        {
            user.UserName = updateDto.Username;
        }
        
        if (!string.IsNullOrEmpty(updateDto.Email))
        {
            user.Email = updateDto.Email;
        }
        
        var result = await _userManager.UpdateAsync(user);
        
        if (!result.Succeeded)
        {
            throw new InvalidOperationException($"Error updating user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }
        
        return _mapper.Map<UserDto>(user);
    }

    public async Task<bool> Delete(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        
        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID {userId} not found.");
        }
        
        var result = await _userManager.DeleteAsync(user);
        
        if (!result.Succeeded)
        {
            throw new InvalidOperationException($"Error deleting user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }
        
        return true;
    }

    public async Task<UserAuthResponseDto> Login(UserLoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        
        if (user == null)
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }
        
        var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
        
        if (!isPasswordValid)
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }
        
        return await BuildToken(user);
    }
    
    private async Task<UserAuthResponseDto> BuildToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(ClaimTypes.Name, user.UserName!),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };

        var claimsDb = await _userManager.GetClaimsAsync(user);

        claims.AddRange(claimsDb);
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var expiration = DateTime.UtcNow.AddYears(1);
        
        var securityToken = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
            expires: expiration, signingCredentials: credentials);
        
        var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

        return new UserAuthResponseDto
        {
            Token = token,
            Expiration = expiration,
        };
    }


}