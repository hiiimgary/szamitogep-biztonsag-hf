using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Trumpery.Models
{
    public class Caff
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        [Column("Tags")]
        public string TagsRaw { get; set; }
        [NotMapped]
        public List<string> Tags => TagsRaw.Split('_').ToList();
        [Required]
        public string Description { get; set; }
        [Required]
        public string TimeOfCreation { get; set; }
        [Required]
        public string CaffFilePath { get; set; }
        [Required]
        public string GifFilePath { get; set; }
    }
}
