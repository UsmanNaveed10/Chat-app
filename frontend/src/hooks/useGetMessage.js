import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";  // Add toast for error handling

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);  // Initialize loading state to false
    const { messages, setMessages, selectedConversation } = useConversation();  // Use object destructuring

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);  // Use backticks for template literals
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                
                setMessages(data);
            } catch (error) {
                toast.error(error.message);  // Handle error with toast or log it
            } finally {
                setLoading(false);
            }
        };
        
        if (selectedConversation?._id) getMessages();  // Only fetch if there's a selected conversation

    }, [selectedConversation?._id, setMessages]);  // Add dependencies

    return [messages, loading];
};

export default useGetMessage;
