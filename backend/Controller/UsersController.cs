using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using quiz_ai_app.DTOs.User;
using quiz_ai_app.Entitys;

namespace quiz_ai_app.Controller;

[ApiController]
[Route("api/users")]
public class UsersController: ControllerBase
{
    private UserManager<User> _userManager;
    
    public UsersController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }
    
    private async Task<UserAuthResponseDto> BuildToken(UserInsertDto credentialsUserDto)
    {
        var claims = new List<Claim>
        {
            new Claim("email", credentialsUserDto.Email),
            new Claim("username", credentialsUserDto.Username)
        };

        var user = await _userManager.FindByEmailAsync(credentialsUserDto.Email);
        var claimsDB = await _userManager.GetClaimsAsync(user!);
        
        claims.AddRange(claimsDB);
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("key_secret_fix_in_serviesUsers"));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var expiration = DateTime.UtcNow.AddYears(1);
        
        var securityToken = new JwtSecurityToken(issuer:null, audience: null, claims: claims, 
            expires: expiration, signingCredentials: credentials);
        
        var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

        return new UserAuthResponseDto
        {
            Token = token,
            Expiration = expiration,
        };
    }
}