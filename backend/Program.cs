using FluentValidation;
using Microsoft.EntityFrameworkCore;
using quiz_ai_app.Data;
using quiz_ai_app.DTOs;
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


// dependency injection for services

builder.Services.AddHttpClient<ICreateQuiz,CreateQuizOpenRouterService>(c =>
{
    c.BaseAddress = new Uri(uriBase);
    c.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
    c.DefaultRequestHeaders.Add("HTTP-Referer", "https://localhost");
    c.DefaultRequestHeaders.Add("X-Title", "Quiz AI App");
});

// Validation
builder.Services.AddScoped<IValidator<QuizRequestDto>, QuizRequestValidator>();

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