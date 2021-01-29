using AuthDemo.Models;
using AutoMapper;
using Shared.DTO;

namespace AuthDemo.Helpers
{
    public class AutomapperProfiles: Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<UserDetails, UserDetailsDTO>();
            CreateMap<UserDetailsDTO, UserDetails>();
        }
    }
}
