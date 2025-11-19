namespace quiz_ai_app.Entitys;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class Question
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string QuestionText { get; set; } 
    
    public int QuizId { get; set; } 
    
    [ForeignKey("QuizId")]
    [JsonIgnore]
    public virtual Quiz Quiz { get; set; }
    
    public virtual ICollection<Option> Options { get; set; } = [];
}