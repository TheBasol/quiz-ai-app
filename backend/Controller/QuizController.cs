using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quiz_ai_app.Data;
using quiz_ai_app.DTOs;
using quiz_ai_app.Entitys;
using quiz_ai_app.Services;
using quiz_ai_app.Utils;
using System.Text.Json;

namespace quiz_ai_app.Controller;

[ApiController]
[Route("api/quiz")]
public class QuizController: ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ICreateQuiz _openRouterService;
    
    public QuizController(ApplicationDbContext context, ICreateQuiz openAiService)
    {
        this._context = context;
        this._openRouterService = openAiService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quiz>>> Get()
    {
        var quizzes = await _context.Quizzes.ToListAsync();
        return Ok(quizzes);
    }
    
    [HttpGet("{id}", Name = "GetById")]
    public async Task<ActionResult<Quiz>> GetById(int id)
    {
        var quiz = await _context.Quizzes.FindAsync(id);
        if (quiz == null)
        {
            return NotFound();
        }
        return Ok(quiz);
    }

    [HttpPost]
    public async Task<ActionResult<Quiz>> Create(Quiz quiz)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        _context.Add(quiz);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetById", new { id = quiz.Id }, quiz);
    }

    [HttpPost("generate-with-ai")]
    public async Task<ActionResult<string>> GenerateWithAi(
        [FromBody] GenerateQuizRequest request)
    {
        if (string.IsNullOrWhiteSpace(request?.Topic))
        {
            return BadRequest("Topic is required");
        }

        try
        {
            var response = await _openRouterService.GenerateQuizQuestionsAsync(
                request.Topic, 
                request.Difficulty, 
                request.NumberOfQuestions, 
                request.Category, 
                request.FocusArea);
            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("generate-and-save")]
    public async Task<ActionResult<Quiz>> GenerateAndSave(
        [FromBody] GenerateQuizRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var aiResponse = await _openRouterService.GenerateQuizQuestionsAsync(
                request.Topic, 
                request.Difficulty, 
                request.NumberOfQuestions,
                request.Category,
                request.FocusArea);
            
            using var jsonDoc = JsonDocument.Parse(aiResponse);
            var root = jsonDoc.RootElement;
            var questionsElement = root.GetProperty("questions");
            
            var quiz = new Quiz
            {
                Name = root.TryGetProperty("name", out var nameElement) ? nameElement.GetString() ?? request.QuizName ?? request.Topic : request.QuizName ?? request.Topic,
                Description = root.TryGetProperty("description", out var descElement) ? descElement.GetString() ?? $"Generated quiz about {request.Topic}" : $"Generated quiz about {request.Topic}",
                Category = request.Category ?? request.Topic,
                Difficulty = request.Difficulty,
                TimeLimit = TimeSpan.FromMinutes(request.TimeLimit ?? 30),
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
