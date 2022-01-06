using API.DTOs;

namespace API.Models
{
    public class TrainerResult
    {
        public ErrorDetails Error { get; set; }
        public TrainerDto TrainerDto { get; set; }

        public TrainerResult(ErrorDetails error = null, TrainerDto trainerDto = null)
        {
            Error = error;
            TrainerDto = trainerDto;
        }
    }
}
