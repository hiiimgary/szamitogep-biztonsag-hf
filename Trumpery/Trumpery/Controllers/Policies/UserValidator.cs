using System.Linq;
using System.Text.RegularExpressions;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.Controllers.Policies
{
    public static class UserValidator
    {
        private static readonly string REGEX_EMAIL = @"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*";
        private static readonly string REGEX_PASSWORD = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$";
        private static readonly string REGEX_USERNAME = @"^(?i)(((?=.{6,21}$)[a-z\d]+\.[a-z\d]+)|[a-z\d]{6,32})$";

        public static bool Validate(User user, TrumperyContext _context)
        {
            return
                ValidateUsername(user.Name, _context) &&
                ValidateEmail(user.Email, _context) &&
                ValidatePassword(user.Password);
        }

        public static bool ValidateUsername(string username, TrumperyContext _context)
        {
            bool unique = !_context.Users.Any(u => u.Name.ToLower().Equals(username.ToLower()));
            bool correct = Regex.Match(username, REGEX_USERNAME).Success;
            return unique && correct;
        }

        private static bool ValidateEmail(string email, TrumperyContext _context)
        {
            bool unique = !_context.Users.Any(u => u.Email.ToLower().Equals(email.ToLower()));
            bool correct = Regex.Match(email, REGEX_EMAIL).Success;
            return unique && correct;
        }

        private static bool ValidatePassword(string password)
        {
            return Regex.Match(password, REGEX_PASSWORD).Success;
        }
    }
}
