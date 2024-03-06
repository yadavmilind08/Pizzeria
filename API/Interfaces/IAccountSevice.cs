using API.DTOs;

namespace API.Interfaces
{
    public interface IAccountSevice
    {
        Task<UserDto> RegisterAsync(RegisterDto registerDto);
        Task<UserDto> LoginAsync(LoginDto loginDto);
    }
}