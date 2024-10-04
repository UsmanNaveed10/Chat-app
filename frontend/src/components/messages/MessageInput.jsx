import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className="px-4 mt-auto mb-4" onSubmit={handleSubmit}>
			<div className="flex items-center px-4 py-2 bg-transparent border-t border-gray-600">
				<input
					type="text"
					className="flex-grow bg-transparent p-2 mr-2 border-b border-gray-400 text-white placeholder-gray-400 focus:outline-none"
					placeholder="Type a message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					type="submit"
					className="flex items-center bg-gray-900 bg-opacity-30 text-white hover:bg-opacity-50 px-4 py-2 rounded-lg transition duration-300"


				>
					{loading ? (
						<div className="loading loading-spinner"></div>
					) : (
						<FaPaperPlane className="text-xl" />
					)}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;

