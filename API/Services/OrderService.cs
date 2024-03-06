using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;

namespace API.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public OrderService(IOrderRepository orderRepository, IMapper mapper, IUserRepository userRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersAsync()
        {
            var orders = await _orderRepository.GetOrdersAsync();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByUsernameAsync(string username)
        {
            var orders = await _orderRepository.GetOrdersByUsernameAsync(username);
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<bool> CreateOrderAsync(CreateOrderDto createOrderDto, string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            var order = _mapper.Map<Order>(createOrderDto);
            order.User = user;
            return await _orderRepository.CreateOrderAsync(order);
        }
    }
}