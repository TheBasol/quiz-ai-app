using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using quiz_ai_app.Data;
using quiz_ai_app.Entitys;

namespace quiz_ai_app.Repository;

public class QuizRepository: IRepository<Quiz>
{
    private ApplicationDbContext _context;
    
    public QuizRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Quiz>> GetAll()
    {

        var quiz = await _context.Quizzes.Include(q => q.Questions)
            .ThenInclude(q => q.Options)
            .ToListAsync();
        
        return quiz;
    }

    
    public async Task<Quiz> GetById(int id)
    {
        var quiz = await _context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Options)
            .FirstOrDefaultAsync(q => q.Id == id);

        return quiz;
    }

    public async Task Add(Quiz quiz) 
        => await _context.AddAsync(quiz);
        

    public void Update(Quiz quiz)
    {
        _context.Attach(quiz);
        _context.Entry(quiz).State = EntityState.Modified;
    }

    public void Delete(Quiz quiz)
        => _context.Quizzes.Remove(quiz);

    public Task Save()
        => _context.SaveChangesAsync();
}