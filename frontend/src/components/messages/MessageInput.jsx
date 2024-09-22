import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // Clear the input after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center px-4 py-2 bg-transparent border-t border-gray-600">
      <input
        type="text"
        className="flex-grow bg-transparent p-2 mr-2 border-b border-gray-400 text-white placeholder-gray-400 focus:outline-none"
        placeholder="Type a message..."
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="text-blue-400 hover:text-blue-500 flex items-center"
        onClick={handleSendMessage}
      >
        <FaPaperPlane className="mr-2" />
      </button>
    </div>
  );
};

export default MessageInput;
