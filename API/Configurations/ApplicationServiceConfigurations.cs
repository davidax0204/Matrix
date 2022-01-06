using API.AutoMapperConfig;
using API.Data;
using API.Interfaces;
using API.Repositories;
using API.services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Configurations
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers();

            services.AddScoped<ITrainerRepository, TrainerRepository>();
            services.AddScoped<IHeroRepository, HeroRepository>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            return services;
        }
    }
}
