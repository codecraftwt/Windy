import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  console.log("API called with messages", messages);

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages should be an array." });
  }

  try {

    const systemMessage = {
      role: "system",
      content: "You are a friendly and concise assistant. Respond in a simple, human-like way with short, clear sentences.",
    };

    const openAIResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
         messages: [systemMessage, ...messages],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = openAIResponse.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
