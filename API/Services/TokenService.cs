using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace API.Services
{
    public class TokenService
    {
        public string CreateToken(AppUser user)
        {
            var tokenKey = string.Empty;
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            if(env == "Development")
            {
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    //.AddJsonFile("appsettings.json")
                    .AddJsonFile("appsettings.Development.json") //for development settings
                    .Build();
                tokenKey = configuration["tokenKey"];
            }
            else
            {
                // tokenKey = Environment.GetEnvironmentVariable("TokenKey");
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    //.AddJsonFile("appsettings.json")
                    .AddJsonFile("appsettings.json") //for development settings
                    .Build();
                tokenKey = configuration["tokenKey"];
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}