using System;
using System.Linq;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.DTOs
{
    public class CommentRequest
    {
        public string Content { get; set; }
        public string UserId { get; set; }
        public string CaffId { get; set; }

        public Comment ToComment(TrumperyContext _context)
        {
            return new Comment
            {
                Content = this.Content,
                TimeOfCreation = DateTime.Now.ToString(),
                Hidden = false,
                User = _context.Users.FirstOrDefault(u => u.Id == Int64.Parse(UserId)),
                Caff = _context.Caffs.FirstOrDefault(c => c.Id == Int64.Parse(CaffId))
            };
        }
    }
}
