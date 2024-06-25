const Conversation = require("../Models/Converstation");
const Message = require("../Models/Message");
const { getreceiverSocketId, io } = require('../Socket/Socket.js');


const sendmessage = async (req, res) => {
    try {
        const senderId = req.id;
        const recevierId = req.params.id;
        const { message } = req.body;

        let gotConverstion = await Conversation.findOne({
            participants: { $all: [senderId, recevierId] }
        });

        if (!gotConverstion) {
            gotConverstion = await Conversation.create({
                participants: [senderId, recevierId]
            })
        }

        const newmessage = await Message.create({
            senderId,
            recevierId,
            message
        })

        if (newmessage) {
            gotConverstion.message.push(newmessage._id)
        }

        await gotConverstion.save();

        //Send msg to receiver imidatetly

        const receiverSocketId = getreceiverSocketId(recevierId);
        if (receiverSocketId) {
            console.log(receiverSocketId);
            io.to(receiverSocketId).emit("newmessage", newmessage)
        } else {
            console.log("id not found")
        }

        return res.status(201).json({
            newmessage
        })

    } catch (error) {
        console.log(error)
    }
}

const getMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const recevierId = req.params.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, recevierId] }
        }).populate("message")
        return res.status(201).json(conversation.message)
    } catch (error) {

    }
}

module.exports = { sendmessage, getMessage }