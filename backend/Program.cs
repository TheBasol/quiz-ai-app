using Microsoft.EntityFrameworkCore;
using quiz_ai_app.Data;
using quiz_ai_app.Services;

var builder = WebApplication.CreateBuilder(args);

// services area

// connection to database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString)
);

builder.Services.AddHttpClient();

builder.Services.AddScoped<ICreateQuiz,CreateQuizOpenRouterService>();

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