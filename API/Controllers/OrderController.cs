using System.Security.Claims;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrderController : BaseApiController
    {
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
    {
        var orders = await _orderService.GetOrdersAsync();
        return Ok(orders);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrdersByUsername(string username)
    {
        var orders = await _orderService.GetOrdersByUsernameAsync(username);
        return Ok(orders);
    }

    [HttpPost]
    public async Task<ActionResult<bool>> CreateOrder(CreateOrderDto createOrderDto)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var result = await _orderService.CreateOrderAsync(createOrderDto, username);
        return Ok(result);
    }
    }
}