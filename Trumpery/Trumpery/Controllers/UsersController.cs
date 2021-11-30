using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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

        [HttpGet("index")]
        [Authorize]
        public ActionResult<IEnumerable<Object>> Index()
        {
            if (!IsAdmin(_context)) return Unauthorized();
            return FilterUsers(_context.Users.ToList());
        }

        [HttpGet("show/{id}")]
        [Authorize]
        public ActionResult<Object> Show(int id)
        {
            return FilterUser(_context.Users.FirstOrDefault(u => u.Id == id));
        }

        [HttpGet("lofasz")]
        public ActionResult<User> Kercso() => Ok();

        [HttpPost("create")]
        public IActionResult Create([FromBody] User user)
        {
            user.Admin = false;
            if (!ValidUsername(user.Name) || !ValidEmail(user.Email) || !StrongPassword(user.Password)) return BadRequest();
            _context.Users.Add(user);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("update/{id}")]
        [Authorize]
        public IActionResult Update(int id, [FromBody] string username)
        {
            if (!IsAdmin(_context)) return Unauthorized();
            if (_context.Users.Any(e => e.Id == id) && ValidUsername(username))
            {
                User user = _context.Users.FirstOrDefault(u => u.Id == id);
                user.Name = username;
                _context.Entry(user).State = EntityState.Modified;
                _context.SaveChanges();
                return NoContent();
            }
            return NotFound();
        }

        [HttpDelete("destroy/{id}")]
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

        private List<Object> FilterUsers(List<User> users)
        {
            if (users == null) return null;
            List<Object> objects = new List<Object>();
            foreach (User u in users)
            {
                objects.Add(FilterUser(u));
            }
            return objects;
        }

        private Object FilterUser(User user)
        {
            if (user == null) return null;
            return new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email
            };
        }
    }
}
