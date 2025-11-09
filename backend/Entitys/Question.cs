namespace QuizAiApp.Entitys;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Question
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string QuestionText { get; set; } 


    public int QuizId { get; set; } 
    
    [ForeignKey("QuizId")]
    public virtual Quiz Quiz { get; set; }
    
    public virtual ICollection<Option> Options { get; set; } = new List<Option>();
}