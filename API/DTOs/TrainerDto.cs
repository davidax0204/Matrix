using API.Models;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class TrainerDto
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Token { get; set; }

        public TrainerDto(AppUser user, string token)
        {
            Id = user.Id;
            UserName = user.UserName;
            Email = user.Email;
            Token = token;
        }

    }
}
