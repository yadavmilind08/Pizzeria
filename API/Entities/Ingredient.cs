using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Ingredients")]
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Type { get; set; }
        public int PizzaId { get; set; }
        public Pizza Pizza { get; set; }
    }
}