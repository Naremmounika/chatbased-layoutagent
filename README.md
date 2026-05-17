# Chat-Based Layout Agent

A chat-based web application that allows users to transform design layouts using natural language commands.

Users can modify layout elements like aspect ratio, text position, size, and product placement while viewing a live wireframe preview.

---

## Features

- Chat interface for layout commands
- Live wireframe preview
- JSON-based layout transformations
- Hide/show JSON viewer
- Quick command buttons

### Supported Commands

- Convert to 9:16
- Move headline to top
- Make headline smaller
- Center product

---

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express
- Axios
- CORS

---

## Project Structure

```bash
layout-agent/
├── client/
│   ├── src/
│   │   ├── data/
│   │   │   └── initialLayout.json
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│
├── server/
│   ├── index.js
│   └── package.json
│
├── README.md
└── APPROACH.md
```

---

## Installation

### Clone repository

```bash
git clone <your-repo-link>
cd layout-agent
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Runs frontend on:
http://localhost:5173

---

## Backend Setup

```bash
cd server
npm install
node index.js
```

Runs backend on:
http://localhost:3001

---

## Example Usage

Try these commands:

```bash
Convert to 9:16
move headline to top
make headline smaller
center product
```

---

## Future Improvements

- OpenAI/Claude API integration
- Better natural language understanding
- More layout transformations
- Drag-and-drop editing
- Undo/redo support