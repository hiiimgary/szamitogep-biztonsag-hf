using Microsoft.EntityFrameworkCore;
using Trumpery.Models;

namespace Trumpery.Data
{
    public class TrumperyContext : DbContext
    {
        public TrumperyContext(DbContextOptions<TrumperyContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Caff> Caffs { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
