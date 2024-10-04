import { useEffect } from "react";
import { FaComments } from "react-icons/fa";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "../../zustand/useConversation"; // Zustand for conversation state
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation(); // Get selected conversation and setter
    
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  
  // Handle Esc key press to exit the chat
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setSelectedConversation(null); // Deselect the conversation on Esc
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleEsc);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col h-full bg-transparent text-white">
      {/* Header Section */}
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {selectedConversation ? `Chat with ${selectedConversation.fullname}` : "No Chat Selected"}
        </h2>
      </div>

      {/* Conditionally render based on chat selection */}
      {selectedConversation ? (
        <>
          {/* Message Content */}
          <div className="px-4 py-2 mb-2 flex-grow overflow-auto bg-transparent">
            <Messages />
          </div>

          {/* Message Input (Fixed at Bottom) */}
          <div className="sticky bottom-0 bg-transparent">
            <MessageInput />
          </div>
        </>
      ) : (
        // No Chat Selected Screen with Transparent Background
        <NoChatSelected />
      )}
    </div>
  );
};

// Component for no chat selected view
const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-transparent">
      <FaComments className="text-gray-500 text-6xl mb-4" />
      <h2 className="text-gray-400 text-xl">Hey, {authUser.fullname}</h2>
      <p className="text-gray-500">Please select a chat to start messaging.</p>
    </div>
  );
};

export default MessageContainer;
