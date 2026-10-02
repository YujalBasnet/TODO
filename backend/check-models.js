import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {
  const pager = await ai.models.list();

  for await (const model of pager) {
    if (model.supportedActions?.includes("generateContent")) {
      console.log("✅ USABLE:", model.name);
    }
  }
} catch (error) {
  console.error("Could not list models:");
  console.error(error);
}