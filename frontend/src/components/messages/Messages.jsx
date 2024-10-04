import useGetMessage from "../../hooks/useGetMessage";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeletons from "../MessageSkeletons";
import Message from "./Message";
import { useEffect, useRef } from "react";

const Messages = () => {
  const [messages, loading] = useGetMessage(); // Corrected destructuring
  useListenMessages();
  const lastMessageRef = useRef(null); // Ref for scrolling to the last message

  // Scroll to the last message when messages update
  useEffect(() => {
    const scrollToBottom = () => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Add timeout to ensure scrolling occurs after rendering
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId); // Clean up the timeout
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* Show skeleton loaders while loading */}
      {loading && [...Array(6)].map((_, idx) => <MessageSkeletons key={idx} />)}

      {/* Display message if no messages are available */}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start a conversation</p>
      )}

      {/* Render the actual messages */}
      {!loading &&
        messages.length > 0 && messages.map((message, index) => (
          <div key={message._id}>
            <Message message={message} />
            
            {/* Attach the ref to the last message only */}
            {index === messages.length - 1 && <div ref={lastMessageRef} />}
          </div>
        ))}
    </div>
  );
};

export default Messages;
