using AutoMapper;
using quiz_ai_app.DTOs;
using quiz_ai_app.Entitys;

namespace quiz_ai_app.AutoMappers;

public class MappingProfile: Profile
{
    public MappingProfile()
    {

        CreateMap<QuizInsertDto, Quiz>();
        CreateMap<Quiz, QuizDto>().ForMember(dto => dto.QuizId,
            m => m.MapFrom(quiz => quiz.Id));
        CreateMap<QuizUpdateDto, Quiz>();
        
        CreateMap<Question, QuestionDto>();
        CreateMap<QuestionDto, Question>();
        
        CreateMap<Option, OptionDto>();
        CreateMap<OptionDto, Option>();
    }
}