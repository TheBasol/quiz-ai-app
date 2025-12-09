using Microsoft.AspNetCore.Mvc;
using quiz_ai_app.DTOs;
using quiz_ai_app.Services;
using FluentValidation;

namespace quiz_ai_app.Controller;

[ApiController]
[Route("api/quiz")]
public class QuizController: ControllerBase
{
    private ICommonService<QuizDto,QuizRequestDto,QuizUpdateDto> _quizService;
    private IValidator<QuizUpdateDto> _QuizUpdatevalidator;
    private IValidator<QuizRequestDto> _QuizRequestvalidator;
    
    public QuizController(IValidator<QuizRequestDto> QuizRequestvalidator, 
        [FromKeyedServices("QuizService")] ICommonService<QuizDto,QuizRequestDto,QuizUpdateDto> quizService,
        IValidator<QuizUpdateDto> QuizUpdatevalidator)
    {
        _QuizRequestvalidator = QuizRequestvalidator;
        _QuizUpdatevalidator = QuizUpdatevalidator;
        _quizService = quizService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuizDto>>> GetAll() =>
        Ok(await _quizService.GetAll());
    
    
    [HttpGet("{id}", Name = "GetById")]
    public async Task<ActionResult<QuizDto>> GetById(int id)
    {
        var quizDto = await _quizService.GetById(id);
        
        return quizDto == null ? NotFound() : Ok(quizDto);
    }
    
    [HttpPost]
    public async Task<ActionResult<QuizDto>> Add(
        [FromBody] QuizRequestDto requestDto)
    {
        var validationResult = await _QuizRequestvalidator.ValidateAsync(requestDto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }
        
        var quizDto = await _quizService.Add(requestDto);
        
        return CreatedAtAction("GetById", new { id = quizDto.QuizId }, quizDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<QuizDto>> Update(int id, QuizUpdateDto requestDto)
    {
        var validationResult = await _QuizUpdatevalidator.ValidateAsync(requestDto);
        
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }
        
        var quizDto = await _quizService.Update(id, requestDto);
        
        return quizDto == null ? NotFound() : Ok(quizDto);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<QuizDto>> Delete(int id)
    {
        var quizDto = await _quizService.Delete(id);
        
        return quizDto == null ? NotFound() : Ok(quizDto);
    }
    
}
