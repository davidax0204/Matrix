using System.Threading.Tasks;
using API.Models;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace API.Repositories
{
    public class TrainerRepository : ITrainerRepository
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        public TrainerRepository(IMapper mapper, SignInManager<AppUser> signInManager,
                              UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
        }
        [Authorize]
        public async Task<TrainerResult> Login(TrainerCredentialsDto trainerCredentialsDto)
        {
            var trainer = await getTrainerByEmailAsync(trainerCredentialsDto.Email);

            if (trainer != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(trainer, trainerCredentialsDto.Password, false);

                if (result.Succeeded)
                {
                    var trainerDto = new TrainerDto(trainer, _tokenService.CreateToken(trainer));
                    return new TrainerResult(null, trainerDto);
                }
            }

            var error = new ErrorDetails(401);
            return new TrainerResult(error, null);
        }

        
        public async Task<TrainerResult> Register(TrainerCredentialsDto trainerCredentialsDto)
        {
            var existingTrainerError = await isTrainerExists(trainerCredentialsDto);

            if (existingTrainerError.StatusCode == 409)
            {
                return new TrainerResult(existingTrainerError, null);
            }

            var trainer = _mapper.Map<AppUser>(trainerCredentialsDto);

            var result = await _userManager.CreateAsync(trainer, trainerCredentialsDto.Password);

            if (result.Succeeded)
            {
                var trainerDto = new TrainerDto(trainer, _tokenService.CreateToken(trainer));
                return new TrainerResult(null, trainerDto);
            }

            var error = new ErrorDetails(409);
            return new TrainerResult(error, null);
        }

        private async Task<ErrorDetails> isTrainerExists(TrainerCredentialsDto trainerCredentialsDto)
        {
            if (await isTrainerNameExists(trainerCredentialsDto.UserName))
            {
                var error = new ErrorDetails(409, "The User name is already in use");
                return error;
            }

            if (await isTrainerEmailExists(trainerCredentialsDto.Email))
            {
                var error = new ErrorDetails(409, "The Email is already in use");
                return error;
            }

            return new ErrorDetails();
        }

        private async Task<AppUser> getTrainerByEmailAsync(string email)
        {
            return await _userManager.Users
                        .SingleOrDefaultAsync(x => x.Email == email.ToLower());
        }

        private async Task<bool> isTrainerEmailExists(string email)
        {
            return await _userManager.Users
                        .AnyAsync(x => x.Email == email.ToLower());
        }

        private async Task<bool> isTrainerNameExists(string userName)
        {
            return await _userManager.Users
                        .AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}
