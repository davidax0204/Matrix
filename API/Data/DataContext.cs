using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Hero> Heroes { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(user => user.Heroes)
                .WithOne(hero => hero.AppUser)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
