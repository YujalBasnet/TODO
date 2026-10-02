import { GoogleGenAI } from "@google/genai";



export const parseTodo = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Todo description is required",
      });
    }
    console.log(
  "Gemini API key loaded:",
  !!process.env.GEMINI_API_KEY
);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

    const today = new Date().toISOString().split("T")[0];

    const prompt = `
You are a Todo task parser.

Today's date is ${today}.

Convert the user's natural-language Todo request into structured JSON.

User request:
"${text}"

Return ONLY valid JSON in exactly this format:

{
  "title": "string",
  "description": "string",
  "priority": "High",
  "due_date": "YYYY-MM-DD or null",
  "due_time": "HH:MM:SS or null"
}

Rules:
- title must contain the actual task.
- description should contain additional details, or an empty string.
- priority must be exactly High, Medium, or Low.
- Use High for urgent or deadline-sensitive tasks.
- Use Medium for normal tasks.
- Use Low for less urgent tasks.
- Convert words such as "tomorrow" and "next Monday" into actual dates.
- Convert times such as "5 PM" into 24-hour format.
- If no date is provided, use null.
- If no time is provided, use null.
- Do not add extra fields.
`;

    // let response;

const response = await ai.models.generateContent({
  model: "gemini-3.5-flash-lite",
  contents: prompt,
});

const resultText = response.text;

const cleanedResult = resultText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const todo = JSON.parse(cleanedResult);

    

    const validPriorities = ["High", "Medium", "Low"];

    if (!todo.title || !validPriorities.includes(todo.priority)) {
      return res.status(500).json({
        message: "AI returned invalid Todo data",
      });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.error("AI Todo Error:", error);

    return res.status(500).json({
      message: "Failed to understand Todo",
      error: error.message,
    });
  }
};