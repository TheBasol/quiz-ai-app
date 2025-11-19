using System.Text;

namespace quiz_ai_app.Utils;

public static class AiPromptGenerator
{
    //investigar sobre toon
    public static string GetSystemPrompt(int numberOfQuestions)
    {
        var template = """
            You are a specialized Quiz Generation AI. Your sole purpose is to generate flawless, valid JSON.

            ## GOLDEN RULE ##
            You MUST return ONLY a valid, raw JSON object.
            - DO NOT include any explanatory text before or after the JSON.
            - DO NOT wrap the JSON in markdown code blocks (```json).
            - Your entire response must start with the opening { and end with the closing }.

            ## JSON Schema ##
            Adhere strictly to this exact structure:
            {
              "name": "Quiz title",
              "description": "Brief description of the quiz",
              "category": "Category name (from user request)",
              "difficulty": "Easy|Medium|Hard (must match user request)",
              "questions": [
                {
                  "question": "Question text",
                  "options": ["Option A", "Option B", "Option C", "Option D"],
                  "answer": "Correct option text"
                }
              ]
            }

            ## Content & Quality Guidelines ##
            1.  **Question Count:** Generate *exactly* {numberOfQuestions} questions.
            2.  **Options Count:** Each question must have *exactly* 4 string options.
            3.  **Answer Validation:** The "answer" field MUST be an exact, case-sensitive match to ONE of the strings in the "options" array.
            4.  **Difficulty:** The "difficulty" field in the JSON MUST match the user's requested difficulty.
            5.  **Quality:**
                - Questions must be clear, accurate, and unambiguous.
                - Options must be plausible, but only one can be correct.
                - The "name" and "description" should be engaging and relevant to the quiz topic.
            """;

        return template.Replace("{numberOfQuestions}", numberOfQuestions.ToString());
    }

    
    public static string GetUserPrompt(string topic, string? category, string difficulty, int numberOfQuestions, string language, string? focusArea = null, string? additionalInstructions = null)
    {
        var sb = new StringBuilder();
        
        sb.AppendLine("## QUIZ SPECIFICATIONS ##");
        sb.AppendLine("<task>Generate Quiz</task>");
        sb.AppendLine($"<topic>{topic}</topic>");
        sb.AppendLine($"<language>{language}</language>");
        sb.AppendLine($"<category>{category ?? "General"}</category>");
        sb.AppendLine($"<difficulty>{difficulty}</difficulty>");
        sb.AppendLine($"<numberOfQuestions>{numberOfQuestions}</numberOfQuestions>");
        
        if (!string.IsNullOrEmpty(focusArea))
        {
            sb.AppendLine($"<focusArea>{focusArea}</focusArea>");
        }

        if (!string.IsNullOrEmpty(additionalInstructions))
        {
            sb.AppendLine($"<additionalInstructions>{additionalInstructions}</additionalInstructions>");
        }

        sb.AppendLine();
        sb.AppendLine("## ACTION ##");
        sb.AppendLine("Proceed with generation. Adhere strictly to all system prompt rules and the JSON schema.");

        return sb.ToString();
    }
    
}
