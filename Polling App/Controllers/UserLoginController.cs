using Microsoft.AspNetCore.Mvc;
using Polling_App.Models;

namespace Polling_App.Controllers
{
    [ApiController]
    [Route("userlogin")]
    public class UserLoginController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<UserLoginController> _logger;

        public UserLoginController(ILogger<UserLoginController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Poll> Get()
        {
            return Enumerable.Range(1, 8).Select(index => new Poll
            {
                Name = "hello",
                Info = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}