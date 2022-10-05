using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class AttendeeDto
    {
        public string Username { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public string Bio { get; set; } = null!;
        public string Image { get; set; } = null!;
        public int FollowersCount { get; set; } = 0;
        public int FollowingCount { get; set; } = 0;
        public bool Following { get; set; }

    }
}