using QuizAiApp.Utils;
using System.ComponentModel.DataAnnotations;

namespace QuizAiApp.Entitys;

public class Quiz
{
    [Key] 
    public int Id { get; set; }

    [Required] 
    [MaxLength(100)]
    public string Name { get; set; }

    [MaxLength(500)]
    public string? Description { get; set; } 


    public TimeSpan TimeLimit { get; set; }

    [Required]
    public DifficultyLevel Difficulty { get; set; }

    [MaxLength(50)]
    public string Category { get; set; }
    
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}