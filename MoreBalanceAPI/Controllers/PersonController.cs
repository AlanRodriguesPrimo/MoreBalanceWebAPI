using API.Controllers.Contract;
using Application.Commands;
using Application.Handlers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : BaseController
    {

        [HttpGet]
        public async Task<IActionResult> GetAllPersons([FromServices] PersonHandler handler)
        {
            var handle = await handler.Handle();
            return Ok(handle);
        }
        [HttpPost]
        public async Task<IActionResult> CreatePerson([FromBody] CreatePersonCommand command, [FromServices] PersonHandler handler)
        {
            var handle =  await handler.Handle(command);
            return Ok(handle);
        }
        [HttpPut]
        public async Task<IActionResult> UpdatePerson([FromBody] UpdatePersonCommand command, [FromServices] PersonHandler handler)
        {
            var handle = await handler.Handle(command);
            return Ok(handle);
        }
        [HttpDelete("id")]
        public async Task<IActionResult> DeletePerson(Guid id, [FromServices] PersonHandler handler)
        {
            var command = new DeletePersonCommand();
            command.Id = id;
            var handle = await handler.Handle(command);
            return Ok(handle);
        } 
    }
}
