using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
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
        public CaffController(TrumperyContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _hostingEnvironment = environment;
        }

        [HttpGet("index")]
        public ActionResult<CaffsResponse> Index([FromBody] SingleStringRequest request)
        {
            if (request.Data == null) return new CaffsResponse(_context.Caffs.ToList());
            return new CaffsResponse(_context.Caffs.Where(c => MatchingSearch(c, request.Data)).ToList());
        }

        private bool MatchingSearch(Caff caff, string keywords)
        {
            List<string> splitWords = keywords.Split("_").ToList();
            List<string> lowerSplitWords = splitWords.ConvertAll(w => w.ToLower());
            foreach (string w in lowerSplitWords)
            {
                if (caff.Author.ToLower().Contains(w)) return true;
                if (caff.Description.ToLower().Contains(w)) return true;
                if (caff.Tags.ConvertAll(t => t.ToLower()).Any(w.Contains)) return true;
            }
            return false;
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
            /// upload caff file
            var caff_folder = Path.Combine(_hostingEnvironment.WebRootPath, "caff");
            var gif_folder = Path.Combine(_hostingEnvironment.WebRootPath, "gif");
            if (!Directory.Exists(caff_folder)) Directory.CreateDirectory(caff_folder);
            if (!Directory.Exists(gif_folder)) Directory.CreateDirectory(gif_folder);
            if (file.Length <= 0) return BadRequest();
            string filename = UniqueRandomString32();
            string caff_path = Path.Combine(caff_folder, filename, ".caff");
            string gif_path = Path.Combine(gif_folder, filename, ".gif");
            using (var fileStream = new FileStream(caff_path, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }
            /// create gif file
            var proc = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "Parser/szamitogep_biztonsag_hf.exe",
                    Arguments = caff_path + " " + gif_path,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                }
            };
            string time = "";
            string auth = "";
            List<string> desc = new List<string>();
            List<string> tags = new List<string>();
            int i = 0;
            proc.Start();
            while (!proc.StandardOutput.EndOfStream)
            {
                string line = proc.StandardOutput.ReadLine();
                if (i == 0) time = line;
                if (i == 1) auth = line;
                if (i >= 2 && i % 2 == 0 && !desc.Contains(line)) desc.Add(line);
                if (i >= 2 && i % 2 == 1 && !tags.Contains(line)) tags.Add(line);
                i++;
            }
            proc.WaitForExit();
            proc.Close();
            /// create db entity
            Caff caff = new Caff();
            caff.TimeOfCreation = time;
            caff.Author = auth;
            caff.Description = String.Join("; ", desc);
            caff.TagsRaw = String.Join("_", tags);
            caff.CaffFilePath = caff_path;
            caff.GifFilePath = gif_path;
            _context.Caffs.Add(caff);
            _context.SaveChanges();
            return NoContent();
        }

        private string UniqueRandomString32()
        {
            var caff_folder = Path.Combine(_hostingEnvironment.WebRootPath, "caff");
            List<string> existingRandoms = new List<string>();
            foreach (string filename in Directory.GetFiles(caff_folder))
            {
                existingRandoms.Add(new string(filename.Take(32).ToArray()));
            }

            Random rng = new Random();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string uniqueRandom = "";
            do
            {
                uniqueRandom = new string(Enumerable.Repeat(chars, 32).Select(s => s[rng.Next(s.Length)]).ToArray());
            } while (!existingRandoms.Contains(uniqueRandom));
            return uniqueRandom;
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
            return File(memory, GetContentType(filePath), file);
        }

        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
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
