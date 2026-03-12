using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Response
{
    public class ApiResponseModel<T>
    {
        public T Data { get; set; }
        public string Message { get; set; }
        public HttpStatusCode Status { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }
}
