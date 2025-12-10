using AutoMapper;
using quiz_ai_app.DTOs;
using quiz_ai_app.DTOs.User;
using quiz_ai_app.Entitys;

namespace quiz_ai_app.AutoMappers;

public class MappingProfile: Profile
{
    public MappingProfile()
    {
        // Quiz mappings
        CreateMap<QuizInsertDto, Quiz>();
        CreateMap<Quiz, QuizDto>()
            .ForMember(dto => dto.QuizId, m => m.MapFrom(quiz => quiz.Id))
            .ForMember(dto => dto.UserId, m => m.MapFrom(quiz => quiz.UserId));
        CreateMap<QuizUpdateDto, Quiz>();
        
        // Question mappings
        CreateMap<Question, QuestionDto>();
        CreateMap<QuestionDto, Question>();
        
        // Option mappings
        CreateMap<Option, OptionDto>();
        CreateMap<OptionDto, Option>();
        
        // User mappings
        CreateMap<User, UserDto>()
            .ForMember(dto => dto.Id, m => m.MapFrom(user => user.Id))
            .ForMember(dto => dto.Username, m => m.MapFrom(user => user.UserName))
            .ForMember(dto => dto.Email, m => m.MapFrom(user => user.Email))
            .ForMember(dto => dto.Quizzes, m => m.MapFrom(user => user.Quizzes));
    }
}