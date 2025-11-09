using Microsoft.AspNetCore.Mvc;
using QuizAiApp.Data;

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
    public ActionResult<IEnumerable<List<string>>> Get()
    {
        return new List<List<string>>
        {
            new List<string> {"What is the capital of France?", "Paris", "London", "Berlin", "Madrid", "A"},
            new List<string> {"What is 2 + 2?", "3", "4", "5", "6", "B"},
            new List<string> {"What is the largest planet in our solar system?", "Earth", "Mars", "Jupiter", "Saturn", "C"}
        };
    }
    
    [HttpGet("list")]
    public ActionResult GetList()
    {
        return Ok( new List<List<string>>
        {
            new List<string> {"What is the capital of France?", "Paris", "London", "Berlin", "Madrid", "A"},
            new List<string> {"What is 2 + 2?", "3", "4", "5", "6", "B"},
            new List<string> {"What is the largest planet in our solar system?", "Earth", "Mars", "Jupiter", "Saturn", "C"}
        });
    }
}