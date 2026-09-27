import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const firstResponse = await client.responses.create({
  model: "gpt-5-mini",
  input: "My name is Anil. I like React.",
});

console.log("\n\nComplete output:", firstResponse.output_text);
