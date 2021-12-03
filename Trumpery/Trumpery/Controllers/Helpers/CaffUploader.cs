using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Trumpery.Controllers.Helpers
{
    public static class CaffUploader
    {
        
        public static string Upload(IWebHostEnvironment _hostingEnvironment, IFormFile file)
        {
            if (!IsValid(file)) return null;
            try
            {
                CreateDirectory(_hostingEnvironment);
                SaveFile(_hostingEnvironment, file);
                string prefix = UniqueRandomString32(_hostingEnvironment);
                Rename(_hostingEnvironment, file, prefix);
                return prefix;
            }
            catch
            {
                return null;
            }
        }

        private static bool IsValid(IFormFile file)
        {
            return (file != null || file.Length > 0);
        }

        private static void CreateDirectory(IWebHostEnvironment _hostingEnvironment)
        {
            var caff_folder = Path.Combine(_hostingEnvironment.WebRootPath, "caff");
            if (!Directory.Exists(caff_folder)) Directory.CreateDirectory(caff_folder);
        }

        private static void SaveFile(IWebHostEnvironment _hostingEnvironment, IFormFile file)
        {
            string path = Path.Combine(_hostingEnvironment.WebRootPath, "caff", file.FileName);
            using (var fileStream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }
        }

        private static void Rename(IWebHostEnvironment _hostingEnvironment, IFormFile file, string prefix)
        {
            FileInfo fi = new FileInfo(Path.Combine(_hostingEnvironment.WebRootPath, "caff", file.FileName));
            if (fi.Exists)
            {
                fi.MoveTo(Path.Combine(_hostingEnvironment.WebRootPath, "caff", prefix + ".caff"));
            }
            else throw new Exception("File not found.");
        }

        private static string UniqueRandomString32(IWebHostEnvironment _hostingEnvironment)
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
            } while (existingRandoms.Contains(uniqueRandom));
            return uniqueRandom;
        }
    }
}
