using API.DTOs;

namespace API.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetOrdersAsync();
        Task<IEnumerable<OrderDto>> GetOrdersByUsernameAsync(string username);
        Task<bool> CreateOrderAsync(CreateOrderDto createOrderDto, string username);
        }
}