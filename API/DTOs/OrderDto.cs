namespace API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public DateTime Created { get; set; }
        public List<PizzaDto> Pizzas { get; set; }
    }
}