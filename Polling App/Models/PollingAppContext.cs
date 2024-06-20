using Microsoft.EntityFrameworkCore;

namespace Polling_App.Models
{
    public class PollingAppContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Poll> Polls { get; set; }

        public PollingAppContext(DbContextOptions options) : base(options)
        {

        }
    }
}
