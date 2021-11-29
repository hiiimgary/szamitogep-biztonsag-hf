using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.Controllers.Policies
{
    public class AuthenticableControllerBase : ControllerBase
    {
        public bool IsAdmin(TrumperyContext context)
        {
            string user_id = User.Claims.Where(u => u.Type == "id").FirstOrDefault().Value;
            User user = context.Users.FirstOrDefault(u => u.Id == Convert.ToInt64(user_id));
            if (user == null) return false;
            return user.Admin;
        }

        public bool IsCurrentUser(int id)
        {
            string user_id = User.Claims.Where(u => u.Type == "id").FirstOrDefault().Value;
            return Convert.ToInt64(user_id) == id;
        }
    }
}
