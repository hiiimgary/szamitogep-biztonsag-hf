using System.Collections.Generic;
using Trumpery.Models;

namespace Trumpery.DTOs
{
    public class UserRegisterRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User ToUser()
        {
            return new User
            {
                Name = Name,
                Email = Email,
                Password = Password,
                Admin = false,
                Comments = new List<Comment>()
            };
        }
    }
}
