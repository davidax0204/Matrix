using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class HeroDto
    {
        [Required]
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

        [Required]
        public int TrainingForToday { get; set; }

        [Required]
        public DateTime LastPowerUp { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public string AppUserId { get; set; }
    }
}
