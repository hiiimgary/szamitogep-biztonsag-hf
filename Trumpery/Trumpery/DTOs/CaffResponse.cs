using System.Collections.Generic;
using System.Linq;
using Trumpery.Data;
using Trumpery.Models;

namespace Trumpery.DTOs
{
    public class CaffResponse
    {
        public string Id { get; set; }
        public string Author { get; set; }
        public string TagsRaw { get; set; }
        public string Description { get; set; }
        public string TimeOfCreation { get; set; }
        public string GifFilePath { get; set; }
        public List<CommentResponse> Comments { get; set; }

        public CaffResponse(Caff caff)
        {
            Id = caff.Id.ToString();
            Author = caff.Author;
            TagsRaw = caff.TagsRaw;
            Description = caff.Description;
            TimeOfCreation = caff.TimeOfCreation;
            GifFilePath = caff.GifFilePath;
            Comments = null;
        }

        public CaffResponse(Caff caff, TrumperyContext _context)
        {
            Id = caff.Id.ToString();
            Author = caff.Author;
            TagsRaw = caff.TagsRaw;
            Description = caff.Description;
            TimeOfCreation = caff.TimeOfCreation;
            GifFilePath = caff.GifFilePath;
            Comments = GetComments(caff, _context);
        }

        private List<CommentResponse> GetComments(Caff caff, TrumperyContext _context)
        {
            List<CommentResponse> comments = new List<CommentResponse>();
            foreach (Comment c in _context.Comments.Where(c => c.Caff.Id == caff.Id))
            {
                if (!c.Hidden) comments.Add(new CommentResponse(c));
            }
            return comments;
        }
    }
}
