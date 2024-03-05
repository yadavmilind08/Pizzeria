using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, AppUserDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<Pizza, PizzaDto>();
            CreateMap<Ingredient, IngredientDto>();

            CreateMap<CreateOrderDto, Order>()
                .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
                .ForMember(dest => dest.Pizzas, opt => opt.MapFrom(src => src.Pizzas));

            CreateMap<CreatePizzaDto, Pizza>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                .ForMember(dest => dest.Ingredients, opt => opt.MapFrom(src => src.Ingredients));
        
            CreateMap<CreateIngredientDto, Ingredient>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type));
        }
    }
}