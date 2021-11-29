using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Trumpery.Models
{
    public class User
    {
        public static IEnumerable<object> Claims { get; internal set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public bool Admin { get; set; }
        [Required]
        public string Password { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
