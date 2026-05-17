import { useState } from "react";
import axios from "axios";
import initialLayout from "./data/initialLayout.json";
import "./App.css";

function App() {
  const [layout, setLayout] = useState(initialLayout);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome! Try transforming your layout."
    }
  ]);
  const [input, setInput] = useState("");
  const [showJson, setShowJson] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (customText) => {
    const messageToSend = customText || input;

    if (!messageToSend.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: messageToSend }
    ]);

    setLoading(true);

    try {
      const response = await axios.post("https://chatbased-layoutagent.onrender.com/api/chat", {
        message: messageToSend,
        layout
      });

      setLayout(response.data.updatedLayout);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.reply
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: error.response 
        }
      ]);
    }

    setLoading(false);
    setInput("");
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared. Start again."
      }
    ]);
  };

  const rootId = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];

  return (
    <div className="app-container">
      <div className="sidebar">
        <div>
          <h2 className="layout-agent-heading">✨ Layout Agent</h2>
          <p className="subtitle">AI-powered design transformations</p>
        </div>

        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.role === "user" ? "user-message" : "assistant-message"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Try: Convert to 9:16"
          />

          <button onClick={() => sendMessage()} disabled={loading}>
            {loading ? "Processing..." : "Send"}
          </button>
        </div>

        <button className="clear-btn" onClick={clearChat}>
          Clear Chat
        </button>
      </div>

      <div className="main-content">
        <h1>Chat-Based Layout Editor</h1>

        <div className="preview-box">
          {artboard.children.map((childId) => {
            const node = layout.nodes[childId];

            return (
              <div
                key={childId}
                className="layout-node"
                style={{
                  left: `${node.nx * 100}%`,
                  top: `${node.ny * 100}%`,
                  width: `${node.nw * 100}%`,
                  height: `${node.nh * 100}%`,
                  backgroundColor:
                    node.type === "text" ? "#fde68a" : "#93c5fd"
                }}
              >
                {node.data?.content || node.name}
              </div>
            );
          })}
        </div>

        <div className="commands">
          <button onClick={() => sendMessage("Convert to 9:16")}>
            Convert 9:16
          </button>
          <button onClick={() => sendMessage("move headline to top")}>
            Move Headline
          </button>
          <button onClick={() => sendMessage("make headline smaller")}>
            Smaller Headline
          </button>
          <button onClick={() => sendMessage("center product")}>
            Center Product
          </button>
        </div>

        <button
          className="json-toggle"
          onClick={() => setShowJson(!showJson)}
        >
          {showJson ? "Hide JSON" : "View JSON"}
        </button>

        {showJson && (
          <pre className="json-viewer">
            {JSON.stringify(layout, null, 2)}
          </pre>
        )}

        <footer className="footer">
          Built with React + Node.js + Express
        </footer>
      </div>
    </div>
  );
}

export default App;