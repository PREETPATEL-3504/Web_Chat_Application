const mongoose = require('mongoose')

const conversationschema = new mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"        
    }],
    message:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"        
    }],
}, {timestamps: true});

const Conversation = mongoose.model('conversation', conversationschema);
module.exports = Conversation;