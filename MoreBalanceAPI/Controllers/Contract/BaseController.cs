using Application.DTOs.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers.Contract
{
    public class BaseController : Controller
    {
        protected IActionResult ApiResponse(object data, string message, HttpStatusCode status)
        {
            var response = new ApiResponseModel<object>
            {
                Data = data,
                Message = message,
                Status = status
            };

        return StatusCode((int)status, response);

        }
    }
}
