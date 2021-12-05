using System.Linq;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.DTOs
{
    public class UserLoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public User ToUser(TrumperyContext _context)
        {
            return _context.Users.FirstOrDefault(u => u.Email == Email && u.Password == Password);
        }
    }
}
