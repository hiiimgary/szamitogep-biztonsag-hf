using Trumpery.Models;

namespace Trumpery.DTOs
{
    public class UserResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        
        public UserResponse(User user)
        {
            Id = user.Id.ToString();
            Name = user.Name;
            Email = user.Email;
        }
    }
}
