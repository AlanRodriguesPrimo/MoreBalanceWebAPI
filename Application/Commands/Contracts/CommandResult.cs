using Application.DTOs.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.Contracts
{
    public class CommandResult<T> : ICommandResult
    {
        public ApiResponseModel<T> Response { get; private set; }

        public CommandResult(T data, HttpStatusCode statusCode, string message="",List<string> errors = null)
        {
            Response = new ApiResponseModel<T>
            {
                Data = data,
                Status = statusCode,
                Message = message,
                Errors = errors
            };

        }

        private string GetDefaultMessage(HttpStatusCode statusCode)
        {
            return statusCode switch
            {
                HttpStatusCode.OK => "Success",
                HttpStatusCode.Created => "Resource created successfully",
                HttpStatusCode.BadRequest => "Bad request",
                HttpStatusCode.Unauthorized => "Unauthorized access",
                HttpStatusCode.Forbidden => "Forbidden",
                HttpStatusCode.NotFound => "Resource not found",
                HttpStatusCode.InternalServerError => "Internal server error",
                _ => "An error occurred"
            };
        }

        public static CommandResult<T> Sucess(T data, HttpStatusCode statusCode, string message= "", List<string> errors = null)
        {
            return new CommandResult<T>(data, statusCode, message, errors?? new List<string>());
        }

        public static CommandResult<T> Failure(HttpStatusCode statusCode, string message)
        {
            return new CommandResult<T>(default, statusCode, message);
        }

    }
}
