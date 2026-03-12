
using Domain.IRepositories.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class RepositoryBase<T>: IRepositoryBase<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        protected bool _saveChanges = true;

        public RepositoryBase(ApplicationDbContext context, bool saveChanges = true)
        {
            _context = context;
            _saveChanges = saveChanges;
        }

        public void DeleteObject(T entity)
        {
            _context.Remove(entity);
            if (_saveChanges)
                _context.SaveChanges();
        }


        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<List<T>> GetAllByParamsAsync(Expression<Func<T, bool>> expression)
        {
            return await _context.Set<T>().Where(expression).ToListAsync();
        }
        public async Task<T> GetByIdAsync(params object[] value)
        {
            return await _context.Set<T>().FindAsync(value);
        }

        public async Task<T> GetByParamsAssync(Expression<Func<T, bool>> expression)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(expression);
        }

        public async Task<T> PostAsync(T entity)
        {
            _context.Set<T>().Add(entity);
            if (_saveChanges)
                await _context.SaveChangesAsync();
            return null;
        }
        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<T> UpdateAsync(T entity)
        {
            _context.UpdateRange(entity);
            if (_saveChanges)
                await _context.SaveChangesAsync();
            return entity;
        }



        void IRepositoryBase<T>.SaveChanges()
        {
            _context.SaveChanges();

        }
    }
}
