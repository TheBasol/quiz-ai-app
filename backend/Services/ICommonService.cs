using quiz_ai_app.DTOs;

namespace quiz_ai_app.Services;

public interface ICommonService<T,TI,TU>
{
    Task<IEnumerable<T>> GetAll();
    Task<T> GetById(int id);
    Task<T> Add(TI insertDto);
    Task<T> Update(int id, TU updateDto);
    Task<T> Delete(int id);
}