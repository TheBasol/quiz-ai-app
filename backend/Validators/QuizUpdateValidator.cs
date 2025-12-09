using FluentValidation;
using quiz_ai_app.DTOs;

namespace quiz_ai_app.Validators;

public class QuizUpdateValidator : AbstractValidator<QuizUpdateDto>
{
    public QuizUpdateValidator()
    {
        RuleFor(quiz => quiz.Name)
            .NotEmpty().WithMessage("Quiz name is required.")
            .MaximumLength(200).WithMessage("Quiz name cannot exceed 200 characters.");

        RuleFor(quiz => quiz.Description)
            .NotEmpty().WithMessage("Description is required.")
            .MaximumLength(500).WithMessage("Description cannot exceed 500 characters.");

        RuleFor(quiz => quiz.Category)
            .NotEmpty().WithMessage("Category is required.")
            .MaximumLength(100).WithMessage("Category cannot exceed 100 characters.");

        RuleFor(quiz => quiz.Difficulty)
            .IsInEnum().WithMessage("Difficulty must be a valid value.");

        RuleFor(quiz => quiz.TimeLimit)
            .GreaterThan(TimeSpan.Zero).WithMessage("Time limit must be greater than zero.");

        RuleFor(quiz => quiz.Questions)
            .NotEmpty().WithMessage("Questions list is required.")
            .Must(questions => questions.Count > 0)
            .WithMessage("At least one question is required.");

        RuleForEach(quiz => quiz.Questions)
            .ChildRules(question =>
            {
                question.RuleFor(q => q.QuestionText)
                    .NotEmpty().WithMessage("Question text is required.")
                    .MaximumLength(500).WithMessage("Question text cannot exceed 500 characters.");

                question.RuleFor(q => q.Options)
                    .NotEmpty().WithMessage("Options are required for each question.")
                    .Must(options => options.Count >= 2)
                    .WithMessage("Each question must have at least 2 options.");

                question.RuleForEach(q => q.Options)
                    .ChildRules(option =>
                    {
                        option.RuleFor(o => o.Text)
                            .NotEmpty().WithMessage("Option text is required.")
                            .MaximumLength(200).WithMessage("Option text cannot exceed 200 characters.");
                    });

                question.RuleFor(q => q.Options)
                    .Must(options => options.Any(o => o.IsCorrect))
                    .WithMessage("Each question must have at least one correct answer.");

                question.RuleFor(q => q.Options)
                    .Must(options => options.Count(o => o.IsCorrect) == 1)
                    .WithMessage("Each question must have exactly one correct answer.");
            });
    }
}