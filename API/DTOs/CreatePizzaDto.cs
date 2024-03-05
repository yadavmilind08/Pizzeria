namespace API.DTOs
{
    public class CreatePizzaDto
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public List<CreateIngredientDto> Ingredients { get; set; }
    }
}