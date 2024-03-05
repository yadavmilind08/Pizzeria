using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Orders")]
    public class Order
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public List<Pizza> Pizzas { get; set; }

    }
}