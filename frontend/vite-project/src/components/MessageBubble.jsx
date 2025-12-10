const MessageBubble = ({ role, text }) => {
  const isUser = role === "user";

  return (
    <div className={`message-row ${isUser ? "right" : "left"}`}>
      <div className={`message-bubble ${isUser ? "user" : "assistant"}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
