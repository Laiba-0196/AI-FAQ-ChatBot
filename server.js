require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load FAQ knowledge base
const faqData = JSON.parse(fs.readFileSync(path.join(__dirname, 'faq.json'), 'utf-8'));

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ reply: 'Please type a message.' });
    }

    // System prompt: force the AI to only answer from our FAQ data
    const systemPrompt = `You are a friendly customer support assistant for a small business.
Answer the customer's question ONLY using the information in the FAQ data below.
If the answer is not clearly available in the data, respond with:
"I'm not sure about that. Let me connect you with our team — please share your email and question."
Keep answers short, friendly, and to the point.

FAQ DATA:
${JSON.stringify(faqData, null, 2)}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.3
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error('Groq Error:', data.error);
      return res.status(500).json({ reply: 'Sorry, something went wrong with the AI service.' });
    }

    const reply = data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ reply: 'Sorry, something went wrong on our end.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});