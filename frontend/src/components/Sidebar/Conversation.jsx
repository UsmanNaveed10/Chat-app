import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastidx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id; // Check if conversation is selected

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id); // Check if the user is online

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-black hover:bg-opacity-50 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-black bg-opacity-50" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="User avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullname}</p>
            <span className="text-xl">🧸</span>
          </div>
        </div>
      </div>
      {!lastidx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
