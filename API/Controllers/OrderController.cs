using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrderController : BaseApiController
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public OrderController(IOrderRepository orderRepository, IMapper mapper, IUserRepository userRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            var orders = await _orderRepository.GetOrdersAsync();

            var usersToReturn = _mapper.Map<IEnumerable<OrderDto>>(orders);

            return Ok(usersToReturn);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrdersByUsername(string username)
        {
            var orders = await _orderRepository.GetOrdersByUsernameAsync(username);

            var usersToReturn = _mapper.Map<IEnumerable<OrderDto>>(orders);

            return Ok(usersToReturn);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> CreateOrder(CreateOrderDto createOrderDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);
            var order = _mapper.Map<Order>(createOrderDto);
            order.User=user;
            return await _orderRepository.CreateOrderAsync(order);
        }
    }
}