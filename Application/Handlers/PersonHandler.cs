using Application.Commands;
using Application.Commands.Contracts;
using Application.DTOs.Response;
using Domain.Entities;
using Domain.IRepositories.Contracts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Application.Handlers
{
    public class PersonHandler
    {
        private readonly IPersonRepository _personRepository;

        public PersonHandler(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }
        public async Task<dynamic> Handle()
        {
            try
            {
                var persons = await _personRepository.GetAllAsync();
                var listPersonsResponse = new List<PersonResponseModel>();

                foreach (var person in persons)
                {
                    var personResponse = new PersonResponseModel(person.Id, person.Name, person.Age);
                    listPersonsResponse.Add(personResponse);
                }
                return CommandResult<List<PersonResponseModel>>.Sucess(listPersonsResponse, HttpStatusCode.OK);

            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }

        }
        public async Task<dynamic> Handle(CreatePersonCommand command)
        {
            try
            {
                var person = new PersonEntity(command.Name, command.Age);

                await _personRepository.PostAsync(person);

                var personResponse = new PersonResponseModel(person.Id, person.Name, person.Age);

                return (ICommandResult)CommandResult<PersonResponseModel>.Sucess(personResponse, HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }


        }
        public async Task<dynamic> Handle(UpdatePersonCommand command)
        {
            try
            {
                var person = await _personRepository.GetByIdAsync(command.Id);
                person.Name = command.Name;
                person.Age = command.Age;

                await _personRepository.UpdateAsync(person);

                var personResponse = new PersonResponseModel(person.Id, person.Name, person.Age);

                return (ICommandResult)CommandResult<PersonResponseModel>.Sucess(personResponse, HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }
    

        }

        public async Task<dynamic> Handle(DeletePersonCommand command)
        {
            try
            {
                var person = await _personRepository.GetByIdAsync(command.Id);

                _personRepository.DeleteObject(person);

                return (ICommandResult)CommandResult<string>.Sucess("Deletado com sucesso!", HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return CommandResult<string>.Failure(HttpStatusCode.InternalServerError, ex.Message);
            }
         

        }


    }
}
