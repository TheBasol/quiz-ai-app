using FluentValidation;
using quiz_ai_app.DTOs;
using quiz_ai_app.Entitys;

namespace quiz_ai_app.Validators;

public class QuizRequestValidator : AbstractValidator<QuizRequestDto>
{
    public QuizRequestValidator()
    {
        RuleFor(quiz => quiz.Topic)
            .NotEmpty().WithMessage("Topic is required.")
            .MaximumLength(100).WithMessage("Topic cannot exceed 100 characters.");
        RuleFor(quiz => quiz.Difficulty).IsInEnum().WithMessage("Difficulty is required.");
        RuleFor(quiz => quiz.NumberOfQuestions)
            .NotEmpty().WithMessage("Number of questions is required.")
            .GreaterThan(0).WithMessage("Number of questions must be greater than zero.");
        RuleFor(quiz => quiz.QuizName)
            .MaximumLength(200).WithMessage("Quiz name cannot exceed 200 characters.");
        RuleFor(quiz => quiz.Category)
            .MaximumLength(100).WithMessage("Category cannot exceed 100 characters.");
        RuleFor(quiz => quiz.TimeLimit)
            .GreaterThan(0).When(quiz => quiz.TimeLimit.HasValue)
            .WithMessage("Time limit must be greater than zero if specified.");
        RuleFor(quiz => quiz.FocusArea)
            .MaximumLength(100).WithMessage("Focus area cannot exceed 200 characters.");
    }
}