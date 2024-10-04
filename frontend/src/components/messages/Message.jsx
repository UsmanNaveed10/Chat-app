import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext.jsx"; // Ensure this is the correct path for useAuthContext
import { extractTime } from "../../utils/extractTime.js";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  
  // Check the createdAt value
  console.log("Message createdAt:", message.createdAt); // Log the createdAt value for debugging
  const formattedtime = extractTime(message.createdAt); // Format the time
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;

  // Background color and text color
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-100";
  const textColor = fromMe ? "text-white" : "text-black"; // Full black for others, white for the sender

  const shakeClass =message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User avatar" src={profilePic || "/default-avatar.png"} /> {/* Default avatar fallback */}
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} ${textColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50">{formattedtime || "Sent just now"}</div> {/* Fallback text */}
    </div>
  );
};

export default Message;


