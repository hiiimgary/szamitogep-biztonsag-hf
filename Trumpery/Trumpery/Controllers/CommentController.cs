using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Trumpery.Controllers.Policies;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.Controllers
{
    [Route("api/comments")]
    [ApiController]
    [Authorize]
    public class CommentController : AuthenticableControllerBase
    {
        private readonly TrumperyContext _context;
        CommentController(TrumperyContext context) => _context = context;

        [HttpPost]
        public IActionResult Create(Comment comment)
        {
            if (!IsCurrentUser(comment.User.Id)) return Unauthorized();
            _context.Comments.Add(comment);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Comment comment)
        {
            if (!IsCurrentUser(comment.User.Id)) return Unauthorized();
            if (_context.Comments.Any(c => c.Id == id))
            {
                _context.Entry(comment).State = EntityState.Modified;
                _context.SaveChanges();
                return NoContent();
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Hide(int id)
        {
            var comment = _context.Comments.Find(id);
            if (comment == null) return NotFound();
            if (!IsCurrentUser(comment.User.Id) && !IsAdmin(_context)) return Unauthorized();
            comment.Hidden = true;
            _context.SaveChanges();
            return NoContent();
        }
    }
}
