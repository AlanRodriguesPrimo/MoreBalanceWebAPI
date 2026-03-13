using API.Controllers.Contract;
using Application.Commands;
using Application.Commands.Category;
using Application.Handlers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MoreBalanceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllCategory([FromServices] CategoryHandler handler)
        {
            var handle = await handler.Handle();
            return Ok(handle);
        }
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryCommand command, [FromServices] CategoryHandler handler)
        {
            var handle = await handler.Handle(command);
            return Ok(handle);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateCategory([FromBody] UpdateCategoryCommand command, [FromServices] CategoryHandler handler)
        {
            var handle = await handler.Handle(command);
            return Ok(handle);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id, [FromServices] CategoryHandler handler)
        {
            var command = new DeleteCommand();
            command.Id = id;
            var handle = await handler.Handle(command);
            return Ok(handle);
        }
    }
}
