using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using Application.Cores;
using FluentValidation.AspNetCore;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Application.Interfaces;
using Infrastructure.Security;
using Infrastructure.Photos;
using Application.Photos;
using API.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
 
builder.Services.AddControllers(opt => 
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddFluentValidationAutoValidation();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DataContext>(options => {
    options.UseSqlite(connectionString);
});
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => 
    {
        options.AddPolicy("CorsPolicy", policy =>
            {
                policy
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000");

            }
        );
    }
);

//Identity service ===============================
builder.Services.AddIdentityCore<AppUser>(opt => {
    opt.Password.RequireNonAlphanumeric = false;
})
.AddEntityFrameworkStores<DataContext>()
.AddSignInManager<SignInManager<AppUser>>();

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false,
        };
        opt.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken =  context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if(!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });
builder.Services.AddAuthorization(opt =>
{
    opt.AddPolicy("IsActivityHost", policy =>
    {
        policy.Requirements.Add(new IsHostRequirement());
    });
});
builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
builder.Services.AddScoped<TokenService>();
//Identity service ===============================
//=================================================

builder.Services.AddMediatR(typeof(List.Handler).Assembly);
//adding automapper
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddScoped<IPhotoAccessor, PhotoAccessor>();
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("Cloudinary"));
builder.Services.AddSignalR();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chat");


// Creating Scope for automated DB creation ======================
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
    // throw;
}
//================================================================
await app.RunAsync();
