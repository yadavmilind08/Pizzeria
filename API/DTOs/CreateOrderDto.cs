namespace API.DTOs
{
    public class CreateOrderDto
    {
        public double Amount { get; set; }
        public List<CreatePizzaDto> Pizzas { get; set; }
    }
}