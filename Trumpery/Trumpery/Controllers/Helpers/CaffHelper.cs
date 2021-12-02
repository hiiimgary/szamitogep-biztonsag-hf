using Microsoft.AspNetCore.StaticFiles;
using System.Collections.Generic;
using System.Linq;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.Controllers.Helpers
{
    public static class CaffHelper
    {
        public static List<Caff> Filter(TrumperyContext _context, string keywords)
        {
            List<Caff> caffs = new List<Caff>();
            foreach (Caff c in _context.Caffs)
            {
                if (FilterMatch(c, keywords)) caffs.Add(c);
            }
            return caffs;
        }

        private static bool FilterMatch(Caff caff, string keywords)
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

        
        public static string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }
    }
}
