using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.DTOs;

namespace API.Models
{
    public class Hero
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Ability { get; set; }

        [Required]
        public string SuitColors { get; set; }
        [Required]
        public double CurrentPower { get; set; }
        [Required]
        public double StartingPower { get; set; }
        public int TrainingForToday { get; set; } = 0;
        public DateTime LastPowerUp { get; set; } = DateTime.Now;
        public DateTime Created { get; set; } = DateTime.Now;
        public AppUser AppUser { get; set; }

        [Required]
        public string AppUserId { get; set; }

        public static Hero HeroInit(NewHeroDto registerHeroDto, string userId)
        {
            return new Hero
            {
                Name = registerHeroDto.Name.ToLower(),
                Ability = registerHeroDto.Ability,
                SuitColors = registerHeroDto.SuitColors,
                StartingPower = registerHeroDto.Ability == "attacker" ? 100 : 50,
                CurrentPower = registerHeroDto.Ability == "attacker" ? 100 : 50,
                AppUserId = userId,
            };
        }

        public static void PowerReset(List<Hero> heroes)
        {
            foreach (Hero hero in heroes)
            {
                if (hero.LastPowerUp.Day != DateTime.Now.Day)
                {
                    hero.TrainingForToday = 0;
                }
            }
        }

        public bool HeroCanTrain()
        {
            if (LastPowerUp.Date.Day != DateTime.Now.Day)
            {
                TrainingForToday = 0;
            }
            else if (LastPowerUp.Day == DateTime.Now.Day && TrainingForToday >= 5)
            {
                return false;
            }

            return true;
        }

        public void Train()
        {
            float powerIncrementPrecentage = ((new Random().Next(1, 10) * .1f) / 10) + 1;
            float newPower = (float)CurrentPower * powerIncrementPrecentage;

            CurrentPower = newPower;
            TrainingForToday++;
            LastPowerUp = DateTime.Now;
        }
    }
}
