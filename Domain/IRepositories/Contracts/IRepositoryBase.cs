using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.IRepositories.Contracts
{
    public interface IRepositoryBase<T> where T : class
    {
        Task<List<T>> GetAllAsync();
        Task<List<T>> GetAllByParamsAsync(Expression<Func<T, bool>> expression);
        Task<T> GetByIdAsync(params object[] value);
        Task<T> GetByParamsAssync(Expression<Func<T, bool>> expression);
        Task<T> PostAsync(T entity);

        Task<T> UpdateAsync(T entity);

        void DeleteObject(T entity);
        void SaveChanges();
    }
}
