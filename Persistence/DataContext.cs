using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            string connStr;

            // Depending on if in development or production, use either Heroku-provided
            // connection string, or development connection string from env var.
            if (env == "Development")
            {
                // Use connection string from file.
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    //.AddJsonFile("appsettings.json")
                    .AddJsonFile("appsettings.Development.json") //for development settings
                    .Build();
                connStr = configuration.GetConnectionString("DefaultConnection");
            }
            else
            {
                // Use connection string provided at runtime by Heroku.
                var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                // Parse connection URL to connection string for Npgsql
                connUrl = connUrl.Replace("postgres://", string.Empty);

                var pgUserInfo = connUrl.Split("@")[0];
                var pgDbInfo = connUrl.Split("@")[1];
                var pgUser = pgUserInfo.Split(":")[0];
                var pgUserPass = pgUserInfo.Split(":")[1];
                var pgHost = pgDbInfo.Split(":")[0];
                var pgPort = pgDbInfo.Split(":")[1].Split("/")[0];
                var pgDbName = pgDbInfo.Split("/")[1];

                connStr = $"Server={pgHost};Port={pgPort};Database={pgDbName};User Id={pgUser};Password={pgUserPass};sslmode=Require;TrustServerCertificate=True;";
            }

            // Whether the connection string came from the local development configuration file
            // or from the environment variable from Heroku, use it to set up your DbContext.
            optionsBuilder.UseNpgsql(connStr);
        }

        public DbSet<Activity> Activities { get; set; } = null!;
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; } = null!;
        public DbSet<Photo> Photos { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;
        public DbSet<UserFollowing> UserFollowings { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Activities)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.Activity)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa => aa.ActivityId);

            builder.Entity<Comment>()
                .HasOne(a => a.Activity)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });

                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Cascade);
                b.HasOne(t => t.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(t => t.TargetId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}