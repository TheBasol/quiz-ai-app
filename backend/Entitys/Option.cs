using System.Text.Json.Serialization;

namespace quiz_ai_app.Entitys;

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
    [JsonIgnore]
    public virtual Question Question { get; set; }
}