using Microsoft.EntityFrameworkCore;
using QuizAiApp.Data;

var builder = WebApplication.CreateBuilder(args);

// services area

// connection to database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString)
);

// controllers
builder.Services.AddControllers();

var app = builder.Build();

// middleware area

app.MapControllers();

app.Run();