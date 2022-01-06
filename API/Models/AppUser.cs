using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class AppUser : IdentityUser
    {
        public ICollection<Hero> Heroes { get; set; }
    }
}
