using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAiApp.Data;
using QuizAiApp.Entitys;

namespace QuizAiApp.Controller;

[ApiController]
[Route("api/quiz")]
public class QuizController: ControllerBase
{
    private readonly ApplicationDbContext context;
    
    public QuizController(ApplicationDbContext context)
    {
        this.context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quiz>>> Get()
    {
        var quizzes = await context.Quizzes.ToListAsync();
        return Ok(quizzes);
    }
    
    [HttpGet("/${id}", Name = "GetById")]
    public async Task<ActionResult<Quiz>> GetById(int id)
    {
        var quiz = await context.Quizzes.FindAsync(id);
        if (quiz == null)
        {
            return NotFound();
        }
        return Ok(quiz);
    }

    [HttpPost]
    public async Task<ActionResult<Quiz>> Create(Quiz quiz)
    {
        context.Add(quiz);
        await context.SaveChangesAsync();
        return CreatedAtAction("GetById", new { id = quiz.Id }, quiz);
    }
}