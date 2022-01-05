using API.DTOs;
using API.Models;
using AutoMapper;

namespace API.AutoMapperConfig
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TrainerCredentialsDto, AppUser>();
        }
    }
}
