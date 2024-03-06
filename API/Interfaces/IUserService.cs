using API.DTOs;

namespace API.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<AppUserDto>> GetUsersAsync();
        Task<AppUserDto> GetUserByUsernameAsync(string username);

    }
}