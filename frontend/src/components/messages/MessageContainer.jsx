import React, { useState } from "react";
import { FaComments } from "react-icons/fa";  // Import the icon
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  // State to track if a chat is selected (true if selected, false if not)
  const [isChatSelected, setIsChatSelected] = useState(false); // false means no chat selected
  const [selectedUser, setSelectedUser] = useState("Justin Bieber"); // Default chat user

  return (
    <div className="md:min-w-[450px] flex flex-col h-full bg-transparent text-white">
      {/* Header Section */}
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {isChatSelected ? `Chat with ${selectedUser}` : "No Chat Selected"}
        </h2>
      </div>

      {/* Conditionally render based on chat selection */}
      {isChatSelected ? (
        <>
          {/* Message Content */}
          <div className="px-4 py-2 mb-2 flex-grow overflow-auto bg-transparent">
            <span className="label-text">To:</span>{" "}
            <span className="text-blue-300 font-thin">{selectedUser}</span>
            <Messages />
          </div>

          {/* Message Input (Fixed at Bottom) */}
          <div className="sticky bottom-0 bg-transparent">
            <MessageInput />
          </div>
        </>
      ) : (
        // No Chat Selected Screen with Transparent Background
        <div className="flex-grow flex flex-col justify-center items-center bg-transparent">
          <FaComments className="text-gray-500 text-6xl mb-4" />
          <h2 className="text-gray-400 text-xl">Hey, Usman Bhatti</h2>
          <p className="text-gray-500">Please select a chat to start messaging.</p>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
