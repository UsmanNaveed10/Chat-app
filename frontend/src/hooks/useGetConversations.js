import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users");
				
				// Check if the response is okay (status code 200)
				if (!res.ok) {
					throw new Error("Failed to fetch conversations");
				}

				const data = await res.json();

				// Check for errors in the returned data
				if (data.error) {
					throw new Error(data.error);
				}

				// Set the conversations state
				setConversations(data);
			} catch (error) {
				// Show an error message
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
