import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import ChatInput from "../components/ChatInput.jsx";
import { sendQuery } from "../services/api.js";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your diet assistant. Ask me any diet-related question.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (question) => {
    // Add user message
    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);

    try {
      setLoading(true);
      const data = await sendQuery(question);
      const botMsg = {
        role: "assistant",
        text: data.answer, // already includes (Ref: Question #X)
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const botMsg = {
        role: "assistant",
        text: "Sorry, something went wrong while getting the answer.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <div className="chat-layout">
        <div className="chat-panel">
          <ChatWindow messages={messages} />
          <ChatInput onSend={handleSend} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
