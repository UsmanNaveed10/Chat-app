import React from "react";
import Conversation from "./Conversation"; // Adjust the import based on your file structure
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	return (
		<div className="py-2 flex flex-col overflow-auto">
			{loading && <span className="loading loading-spinner mx-auto"></span>}
			{!loading && conversations.length === 0 && (
				<p className="text-gray-400 text-center">No conversations available</p>
			)}
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id} // Ensure this is unique
					conversation={conversation}
					lastidx={idx === conversations.length - 1}
				/>
			))}
		</div>
	);
};

export default Conversations;
