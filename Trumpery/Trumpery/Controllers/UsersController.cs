using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Trumpery.Controllers.Policies;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UsersController : AuthenticableControllerBase
    {
        private readonly string REGEX_EMAIL = @"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*";
        private readonly string REGEX_PASSWORD = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$";
        private readonly string REGEX_USERNAME = @"^(?i)(((?=.{6,21}$)[a-z\d]+\.[a-z\d]+)|[a-z\d]{6,32})$";
        private readonly TrumperyContext _context;
        UsersController(TrumperyContext context) => _context = context;

        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<User>> Index()
        {
            if (!IsAdmin(_context)) return Unauthorized();
            return _context.Users;
        }

        [HttpGet("{id}")]
        [Authorize]
        public User Show(int id) => _context.Users.FirstOrDefault(u => u.Id == id);

        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            user.Admin = false;
            if (!ValidUsername(user.Name) || !ValidEmail(user.Email) || !StrongPassword(user.Password)) return BadRequest();
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction("Show", new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Update(int id, User user)
        {
            if (!IsAdmin(_context)) return Unauthorized();
            if (_context.Users.Any(e => e.Id == id))
            {
                _context.Entry(user).State = EntityState.Modified;
                _context.SaveChanges();
                return NoContent();
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Destroy(int id)
        {
            if (!IsAdmin(_context) || !IsCurrentUser(id)) return Unauthorized();
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            _context.SaveChanges();
            return NoContent();
        }

        private bool ValidUsername(string username)
        {
            return Regex.Match(username, REGEX_USERNAME).Success;
        }

        private bool ValidEmail(string email)
        {
            return Regex.Match(email, REGEX_EMAIL).Success;
        }

        private bool StrongPassword(string password)
        {
            return Regex.Match(password, REGEX_PASSWORD).Success;
        }
    }
}
