using API.DTOs;
using System.Collections.Generic;

namespace API.Models
{
    public class HeroResult
    {
        public ErrorDetails Error { get; set; }
        public List<HeroDto> HeroesDto { get; set; }
        public HeroDto Hero { get; set; }
        public bool Success { get; set; } = false;

        public HeroResult(bool success, ErrorDetails error = null, List<HeroDto> heroesDto = null, HeroDto hero = null)
        {
            Error = error;
            Success = success;
            HeroesDto = heroesDto;
            Hero = hero;
        }
    }
}
