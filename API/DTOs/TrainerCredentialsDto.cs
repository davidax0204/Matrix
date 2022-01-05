using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class TrainerCredentialsDto
    {
        [StringLength(20, ErrorMessage = "The {0} must be at least {2} characters long and no longer than {1} characters.", MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z]*$",ErrorMessage = "The {0} must contain letters only")]
        public string UserName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "The {0} must be valid email address")]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z]).{8,}",ErrorMessage = "The {0} must be at least 8 characters long, Contain 1 upercase letter and 1 special character")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
