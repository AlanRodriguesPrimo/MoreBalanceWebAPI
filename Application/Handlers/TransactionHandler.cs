using Application.Commands;
using Application.Commands.Contracts;
using Application.Commands.Person;
using Application.Commands.Transaction;
using Application.DTOs.Response;
using Domain.Entities;
using Domain.IRepositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Handlers
{
    public class TransactionHandler
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IPersonRepository _personRepository;


        public TransactionHandler(ITransactionRepository transactionRepository, ICategoryRepository categoryRepository, IPersonRepository personRepository)
        {
            _transactionRepository = transactionRepository;
            _categoryRepository = categoryRepository;
            _personRepository = personRepository;
        }

        public async Task<dynamic> Handle()
        {
            try
            {
                var transactions = await _transactionRepository.GetAllAsync();
                var listTransactionResponse = new List<TransactionResponseModel>();
                var categorys = await _categoryRepository.GetAllAsync();
                var persons = await _personRepository.GetAllAsync();
                foreach (var transaction in transactions)
                {
                    var category = categorys.Find(x => x.Id == transaction.CategoryId);
                    var person = persons.Find(x => x.Id == transaction.PersonId);
                    var transactionResponse = new TransactionResponseModel(transaction.Id, transaction.Description, transaction.Value, transaction.Type, category!.Description, person!.Name,category.Id,person.Id);
                    listTransactionResponse.Add(transactionResponse);
                }
                return CommandResult<List<TransactionResponseModel>>.Sucess(listTransactionResponse, HttpStatusCode.OK);

            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        public async Task<dynamic> Handle(CreateTransactionCommand command)
        {
            try
            {
                var transaction = new TransactionEntity(command.Description, command.Value, command.Type, command.Category, command.Person);

                await _transactionRepository.PostAsync(transaction);


                return (ICommandResult)CommandResult<string>.Sucess("Cadastrado com sucesso!", HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public async Task<dynamic> Handle(UpdateTransactionCommand command)
        {
            try
            {
                var transaction = await _transactionRepository.GetByIdAsync(command.Id);
                transaction.Description = command.Description;
                transaction.Value = command.Value;
                transaction.Type = command.Type;
                transaction.CategoryId = command.Category;
                transaction.PersonId = command.Person;

                await _transactionRepository.UpdateAsync(transaction);



                return (ICommandResult)CommandResult<string>.Sucess("Atualizado com sucesso!", HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        public async Task<dynamic> Handle(DeleteCommand command)
        {
            try
            {
                var transaction = await _transactionRepository.GetByIdAsync(command.Id);

                _transactionRepository.DeleteObject(transaction);

                return (ICommandResult)CommandResult<string>.Sucess("Deletado com sucesso!", HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }


        }

    }


}
