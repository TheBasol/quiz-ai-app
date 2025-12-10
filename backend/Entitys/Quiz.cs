using quiz_ai_app.Utils;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace quiz_ai_app.Entitys;

public class Quiz
{
    [Key] 
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
    
    public virtual List<Question> Questions { get; set; } = new List<Question>();
    
    [ForeignKey("User")]
    public string? UserId { get; set; }
    public virtual User? User { get; set; }
}