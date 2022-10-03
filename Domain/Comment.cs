using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; } = "";
        public AppUser Author { get; set; } = null!;
        public Activity Activity { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}