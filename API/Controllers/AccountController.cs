using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITrainerRepository _trainerRepository;

        public AccountController(ITrainerRepository trainerRepository)
        {
            _trainerRepository = trainerRepository;
        }

        [HttpPost("login")]
        public async Task<ActionResult<TrainerDto>> Login([FromBody] TrainerCredentialsDto trainerCredentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _trainerRepository.Login(trainerCredentials);

            if (result.TrainerDto != null)
            {
                return Ok(result.TrainerDto);
            }

            return StatusCode(result.Error.StatusCode);
        }

        [HttpPost("register")]
        public async Task<ActionResult<TrainerDto>> Register([FromBody] TrainerCredentialsDto trainerCredentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _trainerRepository.Register(trainerCredentials);

            if (result.TrainerDto != null)
            {
                return Ok(result.TrainerDto);
            }

            return StatusCode(result.Error.StatusCode, result.Error.Message);
        }
    }
}
