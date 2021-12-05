using System.Linq;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.Controllers.Policies
{
    public static class CommentValidator
    {
        public static bool IsValid(Comment comment, TrumperyContext _context)
        {
            return
                comment.Content.Length > 0 &&
                _context.Users.Any(u => u.Id == comment.User.Id) &&
                _context.Caffs.Any(c => c.Id == comment.Caff.Id);
        }
    }
}
