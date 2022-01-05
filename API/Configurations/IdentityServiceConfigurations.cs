using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using API.Models;
using API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace API.Configurations
{
    public static class IdentityServiceConfigurations
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = true;
                opt.Password.RequiredLength = 8;
                opt.Password.RequireDigit = true;
                opt.Password.RequireLowercase = true;
                opt.Password.RequireUppercase = true;
                opt.User.RequireUniqueEmail = true;
            })
                .AddSignInManager<SignInManager<AppUser>>()
                .AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,

                        ValidateAudience = true,
                        ValidAudience = config["Jwt:Audience"],

                        ValidateIssuer = true,
                        ValidIssuer = config["Jwt:Issuer"],

                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"])),
                    };
                });

            return services;
        }
    }
}
