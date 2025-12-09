using System.Text.Json;
using AutoMapper;
using quiz_ai_app.DTOs;
using quiz_ai_app.Entitys;
using quiz_ai_app.Repository;

namespace quiz_ai_app.Services;

public class QuizService : ICommonService<QuizDto,QuizRequestDto,QuizUpdateDto>
{
    private IRepository<Quiz> _quizRepository;
    private ICreateQuizService _createQuizServiceService;
    private IMapper _mapper;
    
    public QuizService(ICreateQuizService createQuizServiceService, IRepository<Quiz> repository,
        IMapper mapper)
    {
        _createQuizServiceService = createQuizServiceService;
        _quizRepository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<QuizDto>> GetAll()
    {
        var quizzes = await _quizRepository.GetAll();
        
        return quizzes.Select(q => _mapper.Map<QuizDto>(q));
    }

    
    public async Task<QuizDto> GetById(int id)
    {
        var quiz = await _quizRepository.GetById(id);

        if (quiz == null)
        {
            return null;
        }
        
        var quizDto = _mapper.Map<QuizDto>(quiz);
        
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
            
        var quizInsertDto = new QuizInsertDto
        {
            Name = root.TryGetProperty("name", out var nameElement) ? nameElement.GetString() ?? requestDto.QuizName ?? requestDto.Topic : requestDto.QuizName ?? requestDto.Topic,
            Description = root.TryGetProperty("description", out var descElement) ? descElement.GetString() ?? $"Generated quiz about {requestDto.Topic}" : $"Generated quiz about {requestDto.Topic}",
            Category = requestDto.Category ?? requestDto.Topic,
            Difficulty = requestDto.Difficulty,
            TimeLimit = TimeSpan.FromMinutes(requestDto.TimeLimit ?? 30),
            Questions = new List<QuestionDto>()
        };
            
        foreach (var questionElement in questionsElement.EnumerateArray())
        {
            var question = new QuestionDto
            {
                QuestionText = questionElement.GetProperty("question").GetString()!,
                Options = new List<OptionDto>()
            };

            var optionsArray = questionElement.GetProperty("options");
            var correctAnswer = questionElement.GetProperty("answer").GetString()!;

            foreach (var optionText in optionsArray.EnumerateArray())
            {
                var text = optionText.GetString()!;
                question.Options.Add(new OptionDto
                {
                    Text = text,
                    IsCorrect = text == correctAnswer
                });
            }

            quizInsertDto.Questions.Add(question);
        }
        
        var quiz = _mapper.Map<Quiz>(quizInsertDto);
            
        await _quizRepository.Add(quiz);
        await _quizRepository.Save();
        
        var quizDto = _mapper.Map<QuizDto>(quiz);
        
        return quizDto;
    }

    public async Task<QuizDto> Update(int id, QuizUpdateDto quizUpdateDto)
    {
        var quiz = await _quizRepository.GetById(id);

        if (quiz == null)
        {
            return null;
        }
        
        _mapper.Map(quizUpdateDto, quiz);
        
        _quizRepository.Update(quiz);
        await _quizRepository.Save();
        
        var quizDto = _mapper.Map<QuizDto>(quiz);
        
        return quizDto;
    }

    public async Task<QuizDto> Delete(int id)
    {
        var quiz = await _quizRepository.GetById(id);

        if (quiz == null)
        {
            return null;
        }
        
        var quizDto = _mapper.Map<QuizDto>(quiz);
        
        _quizRepository.Delete(quiz);
        await _quizRepository.Save();
        
        return quizDto;
    }
    
}