using Application.Commands.Contracts;
using Application.DTOs.Response;
using Domain.IRepositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums.TransactionEnums;

namespace Application.Handlers
{
    public class GeneralSummaryHandler
    {

        private readonly ITransactionRepository _transactionRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IPersonRepository _personRepository;


        public GeneralSummaryHandler(ITransactionRepository transactionRepository, ICategoryRepository categoryRepository, IPersonRepository personRepository)
        {
            _transactionRepository = transactionRepository;
            _categoryRepository = categoryRepository;
            _personRepository = personRepository;
        }


        public async Task<dynamic> HandleSummaryPeople()
        {
            var persons = await _personRepository.GetAllAsync();
            var transactions = await _transactionRepository.GetAllAsync();

            var summary = persons
                .GroupJoin(transactions, p => p.Id, t => t.PersonId,
                    (p, ts) => new PeopleSummary
                    {
                        Name = p.Name,
                        TotalExpenses = ts.Where(x => x.Type == TransactionPurpose.expense).Sum(x => x.Value),
                        TotalRevenues = ts.Where(x => x.Type == TransactionPurpose.revenue).Sum(x => x.Value),
                        Balance = ts.Where(x => x.Type == TransactionPurpose.revenue).Sum(x => x.Value)
                                 - ts.Where(x => x.Type == TransactionPurpose.expense).Sum(x => x.Value)
                    })
                .ToList();

            var response = new GeneralSummaryPeopleResponseModel();
            response.PeopleSummaries = summary;
            response.TotalAmountPeople = summary.Count;
            foreach (var item in summary)
            {
                response.TotalAmountExpenses += item.TotalExpenses;
                response.TotalAmountRevenues += item.TotalRevenues;
                response.TotalAmountBalance += item.Balance;

            }
            return CommandResult<GeneralSummaryPeopleResponseModel>.Sucess(response, HttpStatusCode.OK);
        }

        public async Task<dynamic> HandleSummaryCategory()
        {
            var categorys = await _categoryRepository.GetAllAsync();
            var transactions = await _transactionRepository.GetAllAsync();

            var summary = categorys
                .GroupJoin(transactions, c => c.Id, t => t.CategoryId,
                    (c, ts) => new CategorySummary
                    {
                        Description = c.Description,
                        TotalExpenses = ts.Where(x => x.Type == TransactionPurpose.expense).Sum(x => x.Value),
                        TotalRevenues = ts.Where(x => x.Type == TransactionPurpose.revenue).Sum(x => x.Value),
                        Balance = ts.Where(x => x.Type == TransactionPurpose.revenue).Sum(x => x.Value)
                                 - ts.Where(x => x.Type == TransactionPurpose.expense).Sum(x => x.Value)
                    })
                .ToList();

            var response = new GeneralSummaryCategoryResponseModel();
            response.CategorySummaries = summary;
            response.TotalAmountCategory = summary.Count;
            foreach (var item in summary)
            {
                response.TotalAmountExpenses += item.TotalExpenses;
                response.TotalAmountRevenues += item.TotalRevenues;
                response.TotalAmountBalance += item.Balance;

            }
            return CommandResult<GeneralSummaryCategoryResponseModel>.Sucess(response, HttpStatusCode.OK);


        }
    }
}
