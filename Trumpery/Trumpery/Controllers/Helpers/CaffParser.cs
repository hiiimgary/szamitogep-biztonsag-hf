using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using Trumpery.Models;

namespace Trumpery.Controllers.Helpers
{
    public static class CaffParser
    {
        public static Caff Create(IWebHostEnvironment _hostingEnvironment, string prefix)
        {
            if (!new FileInfo(Path.Combine(_hostingEnvironment.WebRootPath, "caff", prefix, ".caff")).Exists) return null;
            try
            {
                Process proc = SetProcess(_hostingEnvironment, prefix);
                return RunProcess(_hostingEnvironment, prefix, proc);
            }
            catch
            {
                return null;
            }
        }

        private static void CreateDirectory(IWebHostEnvironment _hostingEnvironment)
        {
            var gif_folder = Path.Combine(_hostingEnvironment.WebRootPath, "gif");
            if (!Directory.Exists(gif_folder)) Directory.CreateDirectory(gif_folder);
        }

        private static Process SetProcess(IWebHostEnvironment _hostingEnvironment, string prefix)
        {
            return new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "Controllers/Policies/Parser/szamitogep_biztonsag_hf.exe",
                    Arguments = 
                        Path.Combine(_hostingEnvironment.WebRootPath, "caff", prefix, ".caff") + " " + 
                        Path.Combine(_hostingEnvironment.WebRootPath, "gif", prefix, ".gif"),
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                }
            };
        }

        private static Caff RunProcess(IWebHostEnvironment _hostingEnvironment, string prefix, Process proc)
        {
            Caff caff = new Caff();
            List<string> descHelper = new List<string>();
            List<string> tagsHelper = new List<string>();
            int i = 0;
            proc.Start();
            while (!proc.StandardOutput.EndOfStream)
            {
                string line = proc.StandardOutput.ReadLine();
                if (i == 0) caff.TimeOfCreation = line;
                if (i == 1) caff.Author = line;
                if (i >= 2 && i % 2 == 0 && !descHelper.Contains(line)) descHelper.Add(line);
                if (i >= 2 && i % 2 == 1 && !tagsHelper.Contains(line)) tagsHelper.Add(line);
                i++;
            }
            caff.Description = String.Join("; ", descHelper);
            caff.TagsRaw = String.Join("_", tagsHelper);
            caff.CaffFilePath = Path.Combine(_hostingEnvironment.WebRootPath, "caff", prefix, ".caff");
            caff.GifFilePath = Path.Combine(_hostingEnvironment.WebRootPath, "gif", prefix, ".gif");
            proc.WaitForExit();
            proc.Close();
            return caff;
        }
    }
}
