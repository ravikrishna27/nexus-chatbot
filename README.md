# Nexus AI (formerly DOTLOGGER)

A secure, high-performance, full-stack AI chatbot application built with the MERN Stack (MongoDB, Express, React, Node.js) and powered by the **Google Gemini API (Gemini 2.5 Flash)**.

## Features

- **Modern Tech Stack**: React (Vite) frontend and Node.js/Express backend.
- **Google Gemini Integration**: Uses `@google/genai` with `gemini-2.5-flash` for high-speed, cost-free, context-aware AI conversations.
- **Sleek Minimalist UI**: Features a premium, Vercel-style true dark theme with responsive markdown rendering.
- **Secure Authentication**: Implements multi-layer JWT Tokens, HTTP-Only Signed Cookies, and Password Encryption (bcrypt).
- **Persistent Chat History**: Each user's chat messages are stored in MongoDB and can be retrieved or cleared at any time.

## Prerequisites

Before running the application, make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

## Getting Started

The project is split into two main directories: `backend` and `vite-project-frontend`. You will need to run both concurrently.

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend` folder and configure the following environment variables:
   ```env
   PORT=5001
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRESIN=7d
   COOKIE_SECRET=your_cookie_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should now be running on `http://localhost:5000`.*

### 2. Frontend Setup

1. Open a new terminal window/tab and navigate to the frontend directory:
   ```bash
   cd vite-project-frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend should now be running on `http://localhost:5173` (or the port specified by Vite).*

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
