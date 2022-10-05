using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public string Bio { get; set; } = null!;
        public string Image { get; set; } = null!;
        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public ICollection<Photo> Photos { get; set; } = new List<Photo>();
    }
}