using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class NewHeroDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Ability { get; set; }
        [Required]
        public string SuitColors { get; set; }
    }
}
