namespace quiz_ai_app.Repository;

public interface IRepository<TEntity>
{
    Task<IEnumerable<TEntity>> Get();
}