

using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using quiz_ai_app.Data;
using quiz_ai_app.DTOs;
using quiz_ai_app.Entitys;

namespace quiz_ai_app.Services;

public class QuizService : IQuizService
{
    private ApplicationDbContext _context;
    private ICreateQuizService _createQuizServiceService;
    
    public QuizService(ApplicationDbContext context, ICreateQuizService createQuizServiceService)
    {
        _context = context;
        _createQuizServiceService = createQuizServiceService;
    }
    
    public async Task<IEnumerable<QuizDto>> GetAll() =>
         await _context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Options)
            .Select(q => new QuizDto
            {
                Id = q.Id,
                Name = q.Name,
                Category =  q.Category,
                TimeLimit =  q.TimeLimit,
                Difficulty =  q.Difficulty,
                Description = q.Description,
                Questions = q.Questions.Select(quest => new QuestionDto
                {
                    Id = quest.Id,
                    QuestionText  = quest.QuestionText,
                    Options = quest.Options.Select(opt => new OptionDto
                    {
                        Id = opt.Id,
                        Text = opt.Text,
                        IsCorrect = opt.IsCorrect
                    }).ToList()
                }).ToList()
            })
            .ToListAsync();
    

    public async Task<QuizDto> GetById(int id)
    {
        var quiz = await _context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Options)
            .FirstOrDefaultAsync(q => q.Id == id);

        if (quiz == null)
        {
            return null;
        }
        
        var quizDto = new QuizDto
        {
            Id = quiz.Id,
            Name = quiz.Name,
            Description = quiz.Description,
            Category = quiz.Category,
            Difficulty = quiz.Difficulty,
            TimeLimit = quiz.TimeLimit,
            Questions = quiz.Questions.Select(q => new QuestionDto
            {
                Id = q.Id,
                QuestionText = q.QuestionText,
                Options = q.Options.Select(o => new OptionDto
                {
                    Id = o.Id,
                    Text = o.Text,
                    IsCorrect = o.IsCorrect
                }).ToList()
            }).ToList()
        };
        
        return quizDto;
    }
    
    public async Task<QuizDto> Add(QuizRequestDto requestDto)
    {
        var aiResponse = await _createQuizServiceService.GenerateQuizQuestionsAsync(
            requestDto.Topic, 
            requestDto.Difficulty, 
            requestDto.NumberOfQuestions,
            requestDto.Category,
            requestDto.FocusArea);
            
        using var jsonDoc = JsonDocument.Parse(aiResponse);
        var root = jsonDoc.RootElement;
        var questionsElement = root.GetProperty("questions");
            
        var quiz = new Quiz
        {
            Name = root.TryGetProperty("name", out var nameElement) ? nameElement.GetString() ?? requestDto.QuizName ?? requestDto.Topic : requestDto.QuizName ?? requestDto.Topic,
            Description = root.TryGetProperty("description", out var descElement) ? descElement.GetString() ?? $"Generated quiz about {requestDto.Topic}" : $"Generated quiz about {requestDto.Topic}",
            Category = requestDto.Category ?? requestDto.Topic,
            Difficulty = requestDto.Difficulty,
            TimeLimit = TimeSpan.FromMinutes(requestDto.TimeLimit ?? 30),
            Questions = new List<Question>()
        };
            
        foreach (var questionElement in questionsElement.EnumerateArray())
        {
            var question = new Question
            {
                QuestionText = questionElement.GetProperty("question").GetString()!,
                Options = new List<Option>()
            };

            var optionsArray = questionElement.GetProperty("options");
            var correctAnswer = questionElement.GetProperty("answer").GetString()!;

            foreach (var optionText in optionsArray.EnumerateArray())
            {
                var text = optionText.GetString()!;
                question.Options.Add(new Option
                {
                    Text = text,
                    IsCorrect = text == correctAnswer
                });
            }

            quiz.Questions.Add(question);
        }
            
        await _context.AddAsync(quiz);
        await _context.SaveChangesAsync();
        
        var quizDto = new QuizDto
        {
            Id = quiz.Id,
            Name = quiz.Name,
            Description = quiz.Description,
            Category = quiz.Category,
            Difficulty = quiz.Difficulty,
            TimeLimit = quiz.TimeLimit,
            Questions = quiz.Questions.Select(q => new QuestionDto
            {
                Id = q.Id,
                QuestionText = q.QuestionText,
                Options = q.Options.Select(o => new OptionDto
                {
                    Id = o.Id,
                    Text = o.Text,
                    IsCorrect = o.IsCorrect
                }).ToList()
            }).ToList()
        };

        return quizDto;
    }

    public async Task<QuizDto> Update(int id, QuizUpdateDto updateDto)
    {
        var quiz = await _context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Options)
            .FirstOrDefaultAsync(q => q.Id == id);

        if (quiz == null)
        {
            return null;
        }
        
        quiz.Name = updateDto.Name;
        quiz.Description = updateDto.Description;
        quiz.Category = updateDto.Category;
        quiz.Difficulty = updateDto.Difficulty;
        quiz.TimeLimit = updateDto.TimeLimit;
        
        quiz.Questions = updateDto.Questions.Select(q => new Question
        {
            QuestionText = q.QuestionText,
            Options = q.Options.Select(o => new Option
            {
                Text = o.Text,
                IsCorrect = o.IsCorrect
            }).ToList()
        }).ToList();
        
        
        await _context.SaveChangesAsync();
        
        var quizDto = new QuizDto
        {
            Id = id,
            Name = quiz.Name,
            Description = quiz.Description,
            Category = quiz.Category,
            Difficulty = quiz.Difficulty,
            TimeLimit = quiz.TimeLimit,
            Questions = quiz.Questions.Select(q => new QuestionDto
            {
                Id = q.Id,
                QuestionText = q.QuestionText,
                Options = q.Options.Select(o => new OptionDto
                {
                    Id = o.Id,
                    Text = o.Text,
                    IsCorrect = o.IsCorrect
                }).ToList()
            }).ToList()
        };
        
        return quizDto;
    }

    public async Task<QuizDto> Delete(int id)
    {
        var quiz = await _context.Quizzes.FindAsync(id);

        if (quiz == null)
        {
            return null;
        }
        
        var quizDto = new QuizDto
        {
            Id = id,
            Name = quiz.Name,
            Description = quiz.Description,
            Category = quiz.Category,
            Difficulty = quiz.Difficulty,
            TimeLimit = quiz.TimeLimit,
            Questions = quiz.Questions.Select(q => new QuestionDto
            {
                Id = q.Id,
                QuestionText = q.QuestionText,
                Options = q.Options.Select(o => new OptionDto
                {
                    Id = o.Id,
                    Text = o.Text,
                    IsCorrect = o.IsCorrect
                }).ToList()
            }).ToList()
        };
        
        _context.Quizzes.Remove(quiz);
        await _context.SaveChangesAsync();
        
        return quizDto;
    }
}