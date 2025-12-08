using quiz_ai_app.DTOs;

namespace quiz_ai_app.Services;

public interface IQuizService
{
    Task<IEnumerable<QuizDto>> GetAll();
    Task<QuizDto> GetById(int id);
    Task<QuizDto> Add(QuizRequestDto insertDto);
    Task<QuizDto> Update(int id, QuizUpdateDto updateDto);
    Task<QuizDto> Delete(int id);
}