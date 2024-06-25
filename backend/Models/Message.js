const mongoose = require('mongoose');

const messageschema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    recevierId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    message:{
        type: String,
        require: true
    }
}, {timestamps: true});

const Message = mongoose.model('message', messageschema);
module.exports = Message;