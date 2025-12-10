using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using quiz_ai_app.DTOs;
using quiz_ai_app.Services;
using FluentValidation;
using System.Security.Claims;

namespace quiz_ai_app.Controller;

[ApiController]
[Route("api/quiz")]
public class QuizController: ControllerBase
{
    private IQuizService _quizService;
    private IValidator<QuizUpdateDto> _QuizUpdatevalidator;
    private IValidator<QuizRequestDto> _QuizRequestvalidator;
    
    public QuizController(IValidator<QuizRequestDto> QuizRequestvalidator, 
        IQuizService quizService,
        IValidator<QuizUpdateDto> QuizUpdatevalidator)
    {
        _QuizRequestvalidator = QuizRequestvalidator;
        _QuizUpdatevalidator = QuizUpdatevalidator;
        _quizService = quizService;
    }
    
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<QuizDto>>> GetAll()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("Could not extract user ID from token.");
        }
        
        var allQuizzes = await _quizService.GetAll();
        var userQuizzes = allQuizzes.Where(q => q.UserId == userId);
        
        return Ok(userQuizzes);
    }
    
    
    [HttpGet("{id}", Name = "GetById")]
    [Authorize]
    public async Task<ActionResult<QuizDto>> GetById(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("Could not extract user ID from token.");
        }
        
        var quizDto = await _quizService.GetById(id);
        
        if (quizDto == null)
        {
            return NotFound();
        }

        if (quizDto.UserId != userId)
        {
            return Forbid();
        }
        
        return Ok(quizDto);
    }
    
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<QuizDto>> Add(
        [FromBody] QuizRequestDto requestDto)
    {
        var validationResult = await _QuizRequestvalidator.ValidateAsync(requestDto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }
        
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("Could not extract user ID from token.");
        }
        
        requestDto.UserId = userId;
        
        var quizDto = await _quizService.Add(requestDto);
        
        return CreatedAtAction("GetById", new { id = quizDto.QuizId }, quizDto);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<QuizDto>> Update(int id, QuizUpdateDto requestDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("Could not extract user ID from token.");
        }
        
        var validationResult = await _QuizUpdatevalidator.ValidateAsync(requestDto);
        
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }
        
        var quizDto = await _quizService.GetById(id);
        
        if (quizDto == null)
        {
            return NotFound();
        }
        
        if (quizDto.UserId != userId)
        {
            return Forbid();
        }
        
        var updatedQuiz = await _quizService.Update(id, requestDto);
        
        return Ok(updatedQuiz);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<QuizDto>> Delete(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("Could not extract user ID from token.");
        }
        
        var quizDto = await _quizService.GetById(id);
        
        if (quizDto == null)
        {
            return NotFound();
        }
        
        if (quizDto.UserId != userId)
        {
            return Forbid();
        }
        
        var deletedQuiz = await _quizService.Delete(id);
        
        return Ok(deletedQuiz);
    }
    
}
