using System;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;

namespace API.Interfaces
{
    public interface ITrainerRepository
    {
        Task<TrainerResult> Login(TrainerCredentialsDto trainerCredentialsDto);
        Task<TrainerResult> Register(TrainerCredentialsDto trainerCredentialsDto);
    }
}
