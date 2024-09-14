import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';


export const sendMessage =async (req , res)=> {
   
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // Correct the capitalization of "_id"

    // Find an existing conversation or create a new one
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
        // Create a new conversation if none exists
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

    // Add the new message to the conversation
    if (newMessage) {
        conversation.message.push(newMessage._id);
    }

   

    res.status(201).json({ newMessage });
    

// socket.io functionallity will go here

      // Save both conversation and newMessage
          await Promise.all([conversation.save(), newMessage.save()]);


} catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ Error: "Internal server error" });
}
};


export const getMessages = async (req,res)=>{

    try {
         
        const {id: usertoChatId} = req.params;
        const senderId =req.user._id;
    
        const conversation =await Conversation.findOne({
                participants : {$all : [senderId , usertoChatId]},
        }).populate("message");
    
        res.status(200).json(conversation.message);
    
    
    } 
        catch (error) {
            console.log("Error in getMessages controller:", error.message);
            res.status(500).json({ Error: "Internal server error" });
        }
    };



