namespace API.DTOs
{
    public class PizzaDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public List<IngredientDto> Ingredients { get; set; }
    }
}