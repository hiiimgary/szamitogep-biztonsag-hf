using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Trumpery.Controllers.Policies;
using Trumpery.Data;
using Trumpery.DTOs;
using Trumpery.Models;

namespace Trumpery.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UsersController : AuthenticableControllerBase
    {
        private readonly TrumperyContext _context;
        private readonly IConfiguration _config;
        public UsersController(TrumperyContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpGet("index")]
        [Authorize]
        public ActionResult<UsersResponse> Index()
        {
            if (!IsAdmin(_context)) return Unauthorized();
            return new UsersResponse(_context.Users.ToList());
        }

        [HttpGet("show/{id}")]
        [Authorize]
        public ActionResult<UserResponse> Show(int id)
        {
            return new UserResponse(_context.Users.FirstOrDefault(u => u.Id == id));
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] UserRegisterRequest request)
        {
            User user = request.ToUser();
            if (!UserValidator.Validate(user, _context)) return BadRequest();
            _context.Users.Add(user);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPost("login")]
        public ActionResult<string> Login([FromBody] UserLoginRequest request)
        {
            User user = request.ToUser(_context);
            if (user != null) return Unauthorized();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Name),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new { token = tokenString });
        }

        [HttpPut("update/{id}")]
        [Authorize]
        public IActionResult Update(int id, [FromBody] string username)
        {
            if (!IsAdmin(_context)) return Unauthorized();
            if (_context.Users.Any(e => e.Id == id))
            {
                User user = _context.Users.FirstOrDefault(u => u.Id == id);
                user.Name = username;
                if (!UserValidator.Validate(user, _context)) return BadRequest();
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
    }
}
