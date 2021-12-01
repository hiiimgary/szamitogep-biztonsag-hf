using Trumpery.Models;

namespace Trumpery.DTOs
{
    public class CommentResponse
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public string TimeOfCreation { get; set; }
        public string UserName { get; set; }

        public CommentResponse(Comment comment)
        {
            Id = comment.Id.ToString();
            Content = comment.Content;
            TimeOfCreation = comment.TimeOfCreation;
            UserName = comment.User.Name;
        }
    }
}
