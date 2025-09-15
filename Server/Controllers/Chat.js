const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getAnswerFromAI = async (req, res) => {
  const { message } = req.body;

  try {
    // Required headers for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are a helpful Study assistant on a website. 
Reply in a heading and concise bullet points (max 3-5 points). 
Each bullet point should be short (one line) and can include a relevant emoji. 
Do not write long paragraphs and use simple text no markdown.`,
        },
        { role: "user", content: message },
      ],
    });

    // Stream tokens as they come
    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content;
      if (token) res.write(token);
    }

    res.end();
  } catch (error) {
    console.error("OpenAI streaming error:", error);
    res.status(500).end();
  }
};
