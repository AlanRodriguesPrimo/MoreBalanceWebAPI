using API.Controllers.Contract;
using Application.Handlers;
using Microsoft.AspNetCore.Mvc;

namespace MoreBalanceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeneralSummaryController : BaseController
    {

        [HttpGet("GetSummaryPeople")]
        public async Task<IActionResult> GetSummaryPeople([FromServices] GeneralSummaryHandler handler)
        {
            var handle = await handler.HandleSummaryPeople();
            return Ok(handle);
        }
        [HttpGet("GetSummaryCategory")]
        public async Task<IActionResult> GetSummaryCategory([FromServices] GeneralSummaryHandler handler)
        {
            var handle = await handler.HandleSummaryCategory();
            return Ok(handle);
        }
    }
}
