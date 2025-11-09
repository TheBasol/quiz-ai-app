namespace QuizAiApp.Entitys;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Option
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Text { get; set; } 
    
    public bool IsCorrect { get; set; }
    
    public int QuestionId { get; set; }
    
    [ForeignKey("QuestionId")]
    public virtual Question Question { get; set; }
}