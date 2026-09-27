import "dotenv/config";
import OpenAI from "openai";
import readline from "node:readline";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [
  {
    role: "system",
    content: "You are a helpful terminal chatbot. Keep answers short and easy to understand.",
  },
];

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

console.log("Simple AI Chatbot");
console.log("Type 'exit' to quit.\n");

while (true) {
  const userInput = await ask("You: ");
  const text = userInput.trim();

  if (!text) {
    continue;
  }

  if (["exit", "quit", "bye"].includes(text.toLowerCase())) {
    console.log("Bot: Goodbye!");
    rl.close();
    break;
  }

  messages.push({
    role: "user",
    content: text,
  });

  try {
    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: messages,
    });

    const reply = response.output_text || "Sorry, I could not answer that.";

    console.log(`Bot: ${reply}\n`);

    messages.push({
      role: "assistant",
      content: reply,
    });
  } catch (error) {
    console.log("Bot: Error talking to OpenAI.");
    console.log(error.message);
    console.log();
  }
}
