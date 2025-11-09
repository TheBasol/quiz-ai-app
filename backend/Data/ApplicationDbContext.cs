using Microsoft.EntityFrameworkCore;
using QuizAiApp.Entitys;

namespace QuizAiApp.Data;

public class ApplicationDbContext : DbContext 
{

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Option> Options { get; set; }
}