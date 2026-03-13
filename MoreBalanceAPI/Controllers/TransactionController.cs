using API.Controllers.Contract;
using Application.Commands;
using Application.Commands.Transaction;
using Application.Handlers;
using Microsoft.AspNetCore.Mvc;

namespace MoreBalanceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllTransactions([FromServices] TransactionHandler handler)
        {
            var handle = await handler.Handle();
            return Ok(handle);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionCommand command, [FromServices] TransactionHandler handler)
        {
            var handle = await handler.Handle(command);
            return Ok(handle);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateTransaction([FromBody] UpdateTransactionCommand command, [FromServices] TransactionHandler handler)
        {
            var handle = await handler.Handle(command);
            return Ok(handle);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id, [FromServices] TransactionHandler handler)
        {
            var command = new DeleteCommand();
            command.Id = id;
            var handle = await handler.Handle(command);
            return Ok(handle);
        }
    }
}
