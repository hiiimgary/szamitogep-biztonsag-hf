using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.Controllers.Policies
{
    public class AuthenticableControllerBase : ControllerBase
    {
        public bool IsAdmin(TrumperyContext context)
        {
            User user = GetCurrentUser(context);
            if (user == null) return false;
            return user.Admin;
        }

        public bool IsCurrentUser(int id)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Convert.ToInt64(userId) == id;
        }

        public User GetCurrentUser(TrumperyContext context)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return context.Users.FirstOrDefault(u => u.Id == Convert.ToInt64(userId));
        }
    }
}
