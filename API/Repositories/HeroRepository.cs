using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class HeroRepository : IHeroRepository
    {
        private readonly DataContext _context;
        public readonly IMapper _mapper;
        public HeroRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<HeroResult> GetHeroes()
        {
            var heroes = await getAllHeroesAsync();

            Hero.PowerReset(heroes);

            var heroesDto = _mapper.Map<List<Hero>, List<HeroDto>>(heroes);

            return new HeroResult(true, null, heroesDto);
        }

        public async Task<HeroResult> CreateHero(string activeUserId, NewHeroDto registerHeroDto)
        {
            var trainer = await getTrainerByIdAsync(activeUserId);

            if (trainer == null)
            {
                var error = new ErrorDetails(404);
                return new HeroResult(false, error);
            }

            if (await isHeroExists(registerHeroDto.Name))
            {
                var error = new ErrorDetails(409, "This Hero name is already in use");
                return new HeroResult(false, error);
            }

            var hero = Hero.HeroInit(registerHeroDto, trainer.Id);

            trainer.Heroes.Add(hero);

            if (!await saveAllAsync())
            {
                var error = new ErrorDetails(500);
                return new HeroResult(false, error);
            }

            return new HeroResult(true);
        }

        public async Task<HeroResult> TrainHero(string activeTrainerId, int heroId)
        {
            var trainer = await getTrainerByIdAsync(activeTrainerId);

            if (trainer == null)
            {
                return new HeroResult(false, new ErrorDetails(404));
            }

            var hero = await doesHeroBelongsToTrainer(trainer, heroId);

            if (hero == null)
            {
                var error = new ErrorDetails(401);
                return new HeroResult(false, error);
            }

            if (!hero.HeroCanTrain())
            {
                var error = new ErrorDetails(405, "The hero was already trained 5 times today");
                return new HeroResult(false, error);
            }

            hero.Train();

            if (!await saveAllAsync())
            {
                var error = new ErrorDetails(500);
                return new HeroResult(false, error);
            }

            var heroDto = _mapper.Map<Hero, HeroDto>(hero);

            return new HeroResult(true, null, null, heroDto);
        }

        private async Task<List<Hero>> getAllHeroesAsync()
        {
            return await _context.Heroes
                        .ToListAsync();
        }

        private async Task<AppUser> getTrainerByIdAsync(string trinerId)
        {
            return await _context.Users
                        .Where(x => x.Id == trinerId)
                        .Include(a => a.Heroes)
                        .SingleOrDefaultAsync();
        }
        private async Task<bool> isHeroExists(string heroName)
        {
            return await _context.Heroes
                        .AnyAsync(x => x.Name == heroName);
        }

        private async Task<Hero> doesHeroBelongsToTrainer(AppUser trainer, int heroId)
        {
            return await _context.Heroes
                        .Where(a => a.AppUserId == trainer.Id)
                        .SingleOrDefaultAsync(x => x.Id == heroId);
        }

        private async Task<bool> saveAllAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
