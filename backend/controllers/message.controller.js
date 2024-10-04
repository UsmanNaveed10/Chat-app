import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		// Find or create conversation
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// Create a new message
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		// Add the new message to the conversation (ensure conversation.message is an array)
		if (newMessage) {
			conversation.message.push(newMessage._id); // Ensure field is `message` (array of message IDs)
		}

		// Save both conversation and new message concurrently
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET.IO FUNCTIONALITY
		const receiverSocketId = getReceiverSocketId(receiverId);
if (receiverSocketId) {
  console.log(`Emitting message to socket ${receiverSocketId}`);
  io.to(receiverSocketId).emit("newMessage", newMessage);
} else {
  console.log("Receiver is not online, message saved but not emitted.");
}

		// Respond with the newly created message
		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.stack);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		// Find the conversation and populate its messages
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("message"); // Ensure it populates the correct field `message` (array of message IDs)

		if (!conversation) {
			return res.status(200).json([]); // Return empty array if no conversation found
		}

		// Respond with the populated messages
		const messages = conversation.message; // Correct field name `message`
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.stack);
		res.status(500).json({ error: "Internal server error" });
	}
};
