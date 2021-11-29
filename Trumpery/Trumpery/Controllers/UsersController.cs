using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Trumpery.Controllers.Policies;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class UsersController : AuthenticableControllerBase
    {
        private readonly TrumperyContext _context;
        UsersController(TrumperyContext context) => _context = context;

        [HttpGet]
        public ActionResult<IEnumerable<User>> Index()
        {
            if (!IsAdmin(_context)) return Unauthorized();
            return _context.Users;
        }

        [HttpGet("{id}")]
        public User Show(int id) => _context.Users.FirstOrDefault(u => u.Id == id);

        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction("Show", new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
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
        public IActionResult Delete(int id)
        {
            if (!IsAdmin(_context) || !IsCurrentUser(id)) return Unauthorized();
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
