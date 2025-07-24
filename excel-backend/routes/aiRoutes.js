const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/insights', async (req, res) => {
  const { data } = req.body;

  try {
    const prompt = `
You are an AI data analyst. Based on this Excel data, summarize interesting insights like averages, trends, outliers, and patterns in plain English:

${JSON.stringify(data).slice(0, 4000)} 
`;

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or gpt-4 if available
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const aiText = chatResponse.choices[0].message.content;
    res.json({ insights: aiText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI analysis failed' });
  }
});

module.exports = router;
