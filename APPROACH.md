# Project Approach

## Overview

This project is a chat-based layout agent that transforms layout JSON using natural language commands.

The application takes user commands such as:

- Convert to 9:16
- Move headline to top
- Make headline smaller
- Center product

and updates the layout accordingly.

---

## Architecture

### Frontend

Built with React.

Responsibilities:
- Chat UI
- Wireframe preview
- JSON viewer
- Command buttons
- State management for layout and chat history

### Backend

Built with Node.js and Express.

Responsibilities:
- Receive user commands
- Process layout transformations
- Return updated layout JSON

---

## Transformation Logic

Implemented deterministic functions:

### resizeArtboard()
Resizes artboard and recalculates node positions using normalized coordinates.

### moveHeadlineToTop()
Moves headline node vertically.

### makeHeadlineSmaller()
Reduces headline dimensions proportionally.

### centerProduct()
Moves product node to centered position.

---

## State Management

Frontend stores:
- current layout JSON
- chat history
- loading state

---

## Safety

- Uses structuredClone() to avoid mutating original layout
- Backend returns updated cloned layout

---

## Future Improvements

Given more time, I would add:

- OpenAI/Claude integration
- Flexible natural language parsing
- Dynamic node detection
- JSON schema validation
- Undo/redo functionality