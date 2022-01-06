using System;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;

namespace API.Interfaces
{
    public interface IHeroRepository
    {
        Task<HeroResult> CreateHero(string activeUserId, NewHeroDto registerHeroDto);
        Task<HeroResult> GetHeroes();
        Task<HeroResult> TrainHero(string activeTrainerId, int heroId);
    }
}
