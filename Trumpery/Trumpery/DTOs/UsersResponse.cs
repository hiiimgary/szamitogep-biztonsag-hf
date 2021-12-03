using System.Collections.Generic;
using Trumpery.Models;

namespace Trumpery.DTOs
{
    public class UsersResponse
    {
        public List<UserResponse> Users { get; set; }
        public UsersResponse(List<User> users)
        {
            Users = new List<UserResponse>();
            foreach (User u in users)
            {
                Users.Add(new UserResponse(u));
            }
        }
    }
}
