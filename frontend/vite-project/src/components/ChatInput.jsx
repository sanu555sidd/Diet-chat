import { useState } from "react";

const ChatInput = ({ onSend, loading }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || loading) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <input
        className="chat-input"
        placeholder="Ask a diet-related question..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="send-btn" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ChatInput;
