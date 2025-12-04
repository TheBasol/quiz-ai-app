using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quiz_ai_app.Data;
using quiz_ai_app.DTOs;
using quiz_ai_app.Entitys;
using quiz_ai_app.Services;
using System.Text.Json;
using FluentValidation;

namespace quiz_ai_app.Controller;

[ApiController]
[Route("api/quiz")]
public class QuizController: ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ICreateQuiz _createQuizService;
    private IValidator<QuizRequestDto> _QuizRequestvalidator;
    
    public QuizController(ApplicationDbContext context, ICreateQuiz createQuizService, IValidator<QuizRequestDto> QuizRequestvalidator)
    {
        _context = context;
        _createQuizService = createQuizService;
        _QuizRequestvalidator = QuizRequestvalidator;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quiz>>> Get()
    {
        var quizzes = await _context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Options)
            .ToListAsync();
        return Ok(quizzes);
    }
    
    [HttpGet("{id}", Name = "GetById")]
    public async Task<ActionResult<Quiz>> GetById(int id)
    {
        var quiz = await _context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Options)
            .FirstOrDefaultAsync(q => q.Id == id);
        
        if (quiz == null)
        {
            return NotFound();
        }
        return Ok(quiz);
    }

    [HttpPost("generate-and-save")]
    public async Task<ActionResult<Quiz>> GenerateAndSave(
        [FromBody] QuizRequestDto requestDto)
    {
        Console.WriteLine(requestDto.NumberOfQuestions);
        var validationResult = await _QuizRequestvalidator.ValidateAsync(requestDto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        try
        {
            var aiResponse = await _createQuizService.GenerateQuizQuestionsAsync(
                requestDto.Topic, 
                requestDto.Difficulty, 
                requestDto.NumberOfQuestions,
                requestDto.Category,
                requestDto.FocusArea);
            
            using var jsonDoc = JsonDocument.Parse(aiResponse);
            var root = jsonDoc.RootElement;
            var questionsElement = root.GetProperty("questions");
            
            var quiz = new Quiz
            {
                Name = root.TryGetProperty("name", out var nameElement) ? nameElement.GetString() ?? requestDto.QuizName ?? requestDto.Topic : requestDto.QuizName ?? requestDto.Topic,
                Description = root.TryGetProperty("description", out var descElement) ? descElement.GetString() ?? $"Generated quiz about {requestDto.Topic}" : $"Generated quiz about {requestDto.Topic}",
                Category = requestDto.Category ?? requestDto.Topic,
                Difficulty = requestDto.Difficulty,
                TimeLimit = TimeSpan.FromMinutes(requestDto.TimeLimit ?? 30),
                Questions = new List<Question>()
            };
            
            foreach (var questionElement in questionsElement.EnumerateArray())
            {
                var question = new Question
                {
                    QuestionText = questionElement.GetProperty("question").GetString()!,
                    Options = new List<Option>()
                };

                var optionsArray = questionElement.GetProperty("options");
                var correctAnswer = questionElement.GetProperty("answer").GetString()!;

                foreach (var optionText in optionsArray.EnumerateArray())
                {
                    var text = optionText.GetString()!;
                    question.Options.Add(new Option
                    {
                        Text = text,
                        IsCorrect = text == correctAnswer
                    });
                }

                quiz.Questions.Add(question);
            }
            
            _context.Add(quiz);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = quiz.Id }, quiz);
        }
        catch (JsonException ex)
        {
            return BadRequest(new { error = "Invalid JSON response from AI", details = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
