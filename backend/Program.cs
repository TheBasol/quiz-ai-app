using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using quiz_ai_app.Data;
using quiz_ai_app.DTOs;
using quiz_ai_app.Entitys;
using quiz_ai_app.Repository;
using quiz_ai_app.Services;
using quiz_ai_app.Validators;

var builder = WebApplication.CreateBuilder(args);

// services area

// connection to database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString)
);

var uriBase = builder.Configuration["OpenRouterApi:UrlBase"] ?? throw new InvalidOperationException("OpenRouterApi:UrlBase is not configured");
var apiKey = builder.Configuration["OpenRouterApi:ApiKey"] ?? throw new InvalidOperationException("OpenRouterApi:ApiKey is not configured");

// Repository 
builder.Services.AddScoped<IRepository<Quiz>, QuizRepository>();

// dependency injection for services

// identity

var keyJwt = builder.Configuration["JwtSettings:SecretKey"] ?? throw new InvalidOperationException("JwtSettings:SecretKey is not configured");

builder.Services.AddIdentityCore<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<UserManager<IdentityUser>>();
builder.Services.AddScoped<SignInManager<IdentityUser>>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.MapInboundClaims = false;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyJwt)),
        ClockSkew =  TimeSpan.Zero
    };
});

//quiz service

builder.Services.AddHttpClient<ICreateQuizService,CreateQuizOpenRouterService>(c =>
{
    c.BaseAddress = new Uri(uriBase);
    c.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
    c.DefaultRequestHeaders.Add("HTTP-Referer", "https://localhost");
    c.DefaultRequestHeaders.Add("X-Title", "Quiz AI App");
});

builder.Services.AddHttpClient<IGetAiModelsService, GetAiModelsService>(c =>
{
    c.BaseAddress = new Uri(uriBase);
    c.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
    c.DefaultRequestHeaders.Add("HTTP-Referer", "https://localhost");
    c.DefaultRequestHeaders.Add("X-Title", "Quiz AI App");
});
builder.Services.AddKeyedScoped<ICommonService<QuizDto,QuizRequestDto,QuizUpdateDto>, QuizService>("QuizService");

//Mappers
builder.Services.AddAutoMapper(cfg => { }, typeof(Program).Assembly);

// Validation
builder.Services.AddScoped<IValidator<QuizRequestDto>, QuizRequestValidator>();
builder.Services.AddScoped<IValidator<QuizUpdateDto>, QuizUpdateValidator>();


// controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

var app = builder.Build();

// middleware area

app.MapControllers();

app.Run();