using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Pizzas")]
    public class Pizza
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }

        public List<Ingredient> Ingredients { get; set; }
        public int OrderId { get; set; } 
        public Order Order { get; set; }
    }
}