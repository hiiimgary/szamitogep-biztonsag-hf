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
    [Route("api/comment")]
    [ApiController]
    [Authorize]
    public class CommentController : AuthenticableControllerBase
    {
        private readonly TrumperyContext _context;
        CommentController(TrumperyContext context) => _context = context;

        [HttpPost("create")]
        public IActionResult Create([FromBody] Comment comment)
        {
            if (!IsCurrentUser(comment.User.Id)) return Unauthorized();
            comment.Hidden = false;
            comment.TimeOfCreation = DateTime.Now.ToString();
            _context.Comments.Add(comment);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromBody] string content)
        {
            if (_context.Comments.Any(c => c.Id == id))
            {
                Comment comment = _context.Comments.FirstOrDefault(c => c.Id == id);
                if (!IsCurrentUser(comment.User.Id)) return Unauthorized();
                comment.Content = content;
                comment.TimeOfCreation = DateTime.Now.ToString();
                _context.Entry(comment).State = EntityState.Modified;
                _context.SaveChanges();
                return NoContent();
            }
            return NotFound();
        }

        [HttpDelete("hide/{id}")]
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
