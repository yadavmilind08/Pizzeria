using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContex _contex;

        public OrderRepository(DataContex contex)
        {
            _contex = contex;
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
           return await _contex.Orders
            .Include(x => x.Pizzas)
                .ThenInclude(x => x.Ingredients)
            .ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersByUsernameAsync(string username)
        {
           return await _contex.Orders
            .Include(x => x.Pizzas)
                .ThenInclude(x => x.Ingredients)
            .Where(x => x.User.UserName == username)    
            .ToListAsync();
        }

        public async Task<bool> CreateOrderAsync(Order order)
        {
            _contex.Orders.Add(order);
           return await _contex.SaveChangesAsync() > 0;
        }

    }
}