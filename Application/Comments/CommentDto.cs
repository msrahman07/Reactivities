using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Body { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Username { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public string Image { get; set; } = null!;
    }
}