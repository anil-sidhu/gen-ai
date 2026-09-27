import "dotenv/config";
import OpenAI from "openai";
import fs from "node:fs";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

async function generateImage() {
  try {
    const result = await client.images.generate({
      model: "gpt-image-1-mini",
      prompt: "A cute small robot reading a book in a library, cartoon style",
      size: "1024x1024",
    });

    const imageBase64 = result.data[0].b64_json;

    fs.writeFileSync("robot.png", imageBase64, "base64");

    console.log("Image saved as robot.png");
  } catch (error) {
    console.log("Error generating image:");
    console.log(error.message);
  }
}

generateImage();
