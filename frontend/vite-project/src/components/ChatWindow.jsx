import MessageBubble from "./MessageBubble.jsx";

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.length === 0 && (
        <div className="empty-state">
          <h2>Welcome to Diet Chat Assistant 👋</h2>
          <p>Ask anything about diet, weight loss, nutrition, and more.</p>
        </div>
      )}

      {messages.map((msg, idx) => (
        <MessageBubble key={idx} role={msg.role} text={msg.text} />
      ))}
    </div>
  );
};

export default ChatWindow;
