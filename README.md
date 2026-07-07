# AI-Powered FAQ Chatbot

A lightweight, embeddable chatbot that answers customer questions using
OpenAI's API, based on a business's own FAQ data.

## 🚀 Setup Instructions

### 1. Install Node.js
Download from https://nodejs.org (LTS version). Verify with:
```
node -v
```

### 2. Get an OpenAI API Key
- Go to https://platform.openai.com
- Create an account, go to "API Keys", generate a new key
- Add a small amount of billing credit ($5 is enough for practice)

### 3. Install Dependencies
Inside this project folder, run:
```
npm install
```

### 4. Set Up Environment Variables
Rename `.env.example` to `.env` and paste your API key inside:
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
PORT=3000
```

### 5. Start the Server
```
npm start
```

### 6. Open in Browser
Go to: http://localhost:3000

Click the chat bubble in the bottom-right corner and try asking:
- "Are you open on Sunday?"
- "Do you deliver?"
- "What's your refund policy?"
- "Do you sell cars?" (should trigger the fallback response)

## 📁 Project Structure
```
ai-faq-chatbot/
├── server.js          # Backend (Express + OpenAI API call)
├── faq.json            # Editable FAQ knowledge base
├── package.json
├── .env.example
├── public/
│   ├── index.html       # Demo website page
│   └── widget.js         # Embeddable chat widget (vanilla JS)
```

## ✏️ Customizing
- Edit `faq.json` to change the business's questions/answers — no code
  changes needed.
- Change colors in `widget.js` inside the `<style>` section.

## 🌐 Deploying (Optional Next Step)
Once working locally, you can deploy for free on:
- **Render** (https://render.com) — good for the Node backend
- **Vercel** — also works well for this kind of small full-stack app

Set the `OPENAI_API_KEY` as an environment variable in your hosting
dashboard (never commit your real `.env` file to GitHub).

## 🎓 What This Project Demonstrates
- REST API integration (OpenAI API)
- Prompt engineering (restricting AI to a knowledge base)
- Full-stack basics (Express backend + vanilla JS frontend)
- Building a reusable, embeddable UI component
- Error handling and fallback logic
