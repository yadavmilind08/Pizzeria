using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContex : DbContext
    {
        public DataContex(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }


    // protected override void OnModelCreating(ModelBuilder modelBuilder)
    // {
    //     modelBuilder.Entity<Order>()
    //         .HasOne(o => o.User)
    //         .WithMany(u => u.Order)
    //         .HasForeignKey(o => o.UserId);

    //     modelBuilder.Entity<Pizza>()
    //         .HasOne(p => p.Order)
    //         .WithMany(o => o.Pizzas)
    //         .HasForeignKey(p => p.OrderId);

    //     modelBuilder.Entity<Ingredient>()
    //         .HasOne(i => i.Pizza)
    //         .WithMany(p => p.Ingredients)
    //         .HasForeignKey(i => i.PizzaId);

    //     base.OnModelCreating(modelBuilder);
    // }

    }
}