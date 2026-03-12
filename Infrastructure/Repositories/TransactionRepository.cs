using Domain.Entities;
using Domain.IRepositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class TransactionRepository : RepositoryBase<TransactionEntity> , ITransactionRepository
    {
        protected readonly ApplicationDbContext _context; 

        public TransactionRepository(ApplicationDbContext context, bool saveChanges = true) : base(context, saveChanges)
        {
        }
    }
}
