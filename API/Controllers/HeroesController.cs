using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class HeroesController : BaseApiController
    {
        public readonly IHeroRepository _heroRepository;

        public HeroesController(IHeroRepository heroRepository)
        {
            _heroRepository = heroRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HeroDto>>> GetHeroes()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var heroGetResult = await _heroRepository.GetHeroes();

            return Ok(heroGetResult.HeroesDto);
        }

        [HttpPost]
        public async Task<ActionResult> CreateHero([FromBody] NewHeroDto registerHeroDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var activeTrainerId = User.FindFirst(ClaimTypes.Sid)?.Value;

            var heroCreateResult = await _heroRepository.CreateHero(activeTrainerId, registerHeroDto);

            if (!heroCreateResult.Success)
            {
                return StatusCode(heroCreateResult.Error.StatusCode, heroCreateResult.Error.Message);
            }

            return StatusCode(201);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> TrainHero([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var activeTrainerId = User.FindFirst(ClaimTypes.Sid)?.Value;

            var heroTrainResult = await _heroRepository.TrainHero(activeTrainerId, id);

            if (!heroTrainResult.Success)
            {
                return StatusCode(heroTrainResult.Error.StatusCode, heroTrainResult.Error.Message);
            }

            return Ok(heroTrainResult.Hero);
        }
    }
}
