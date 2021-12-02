using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using Trumpery.Controllers.Helpers;
using Trumpery.Controllers.Policies;
using Trumpery.Data;
using Trumpery.DTOs;
using Trumpery.Models;

namespace Trumpery.Controllers
{
    [Route("api/caff")]
    [ApiController]
    [Authorize]
    public class CaffController : AuthenticableControllerBase
    {
        private readonly TrumperyContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public CaffController(TrumperyContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("index")]
        public ActionResult<CaffsResponse> Index([FromBody] SingleStringRequest request)
        {
            if (request.Data == null) return new CaffsResponse(_context.Caffs.ToList());
            return new CaffsResponse(CaffHelper.Filter(_context, request.Data));
        }

        [HttpGet("show/{id}")]
        public ActionResult<CaffResponse> Show(int id)
        {
            Caff caff = _context.Caffs.FirstOrDefault(c => c.Id == id);
            if (caff == null) return NotFound();
            return new CaffResponse(caff, _context);
        }

        [HttpPost("upload")]
        public IActionResult Upload([FromForm] IFormFile file)
        {
            string prefix = CaffUploader.Upload(_hostingEnvironment, file);
            if (prefix == null) return BadRequest();
            Caff caff = CaffParser.Create(_hostingEnvironment, prefix);
            if (caff == null) return BadRequest();
            _context.Caffs.Add(caff);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPost("download/{id}")]
        public IActionResult Download(int id)
        {
            Caff caff = _context.Caffs.FirstOrDefault(c => c.Id == id);
            if (caff == null) return NotFound();
            var caff_folder = Path.Combine(_hostingEnvironment.WebRootPath, "caff");
            var file = caff.CaffFilePath;
            var filePath = Path.Combine(caff_folder, file);
            if (!System.IO.File.Exists(filePath)) return NotFound();
            
            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, CaffHelper.GetContentType(filePath), file);
        }

        [HttpDelete("destroy/{id}")]
        public IActionResult Destroy(int id)
        {
            if (!IsAdmin(_context)) return Unauthorized();
            var caff = _context.Caffs.Find(id);
            if (caff == null) return NotFound();
            var caff_folder = Path.Combine(_hostingEnvironment.WebRootPath, "caff");
            var gif_folder = Path.Combine(_hostingEnvironment.WebRootPath, "gif");
            System.IO.File.Delete(Path.Combine(caff_folder, caff.CaffFilePath));
            System.IO.File.Delete(Path.Combine(gif_folder, caff.GifFilePath));
            _context.Caffs.Remove(caff);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
