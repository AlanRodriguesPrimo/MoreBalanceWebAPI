using Application.Commands;
using Application.Commands.Category;
using Application.Commands.Contracts;
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
    public class CategoryHandler
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ITransactionRepository _transactionRepository;

        public CategoryHandler(ICategoryRepository categoryRepository, ITransactionRepository transactionRepository)
        {
            _categoryRepository = categoryRepository;
            _transactionRepository = transactionRepository;
        }

        public async Task<dynamic> Handle()
        {
            try
            {
                var categorys = await _categoryRepository.GetAllAsync();
                var listCategoryResponse = new List<CategoryResponseModel>();

                foreach (var category in categorys)
                {
                    var categoryResponse = new CategoryResponseModel(category.Id, category.Description, category.Purpose);
                    listCategoryResponse.Add(categoryResponse);
                }
                return CommandResult<List<CategoryResponseModel>>.Sucess(listCategoryResponse, HttpStatusCode.OK);

            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }

        }


        public async Task<dynamic> Handle(CreateCategoryCommand command)
        {
            try
            {
                var categoryEntity = new CategoryEntity(command.Description, command.Purpose);

                await _categoryRepository.PostAsync(categoryEntity);

                var categoryResponse = new CategoryResponseModel(categoryEntity.Id, categoryEntity.Description, categoryEntity.Purpose);

                return (ICommandResult)CommandResult<CategoryResponseModel>.Sucess(categoryResponse, HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }

        }


        public async Task<dynamic> Handle(UpdateCategoryCommand command)
        {
            try
            {
                var category = await _categoryRepository.GetByIdAsync(command.Id);
                category.Description = command.Description;
                category.Purpose = command.Purpose;

                await _categoryRepository.UpdateAsync(category);

                var categoryResponse = new CategoryResponseModel(category.Id, category.Description, category.Purpose);

                return (ICommandResult)CommandResult<CategoryResponseModel>.Sucess(categoryResponse, HttpStatusCode.OK);
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
                var category = await _categoryRepository.GetByIdAsync(command.Id);

                var transactions = await _transactionRepository.GetAllByParamsAsync(x => x.CategoryId == category.Id); 

                _transactionRepository.DeleteObjectRange(transactions);
                _categoryRepository.DeleteObject(category);

                return (ICommandResult)CommandResult<string>.Sucess("Deletado com sucesso!", HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }


        }


    }
    }
