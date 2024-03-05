using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<IEnumerable<Order>> GetOrdersByUsernameAsync(string username);
        Task<bool> CreateOrderAsync(Order order);

    }
}