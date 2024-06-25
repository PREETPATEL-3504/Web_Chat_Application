const mongoose = require('mongoose');

//Create a schema
const userschema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilephoto: {
        type: String,
        default: ""
    },
    gender:{
        type:String,
        enum:["male", "female", "Male", "Female"],
        required:true
    }

},{timestamps: true});

//Create a model of user
const user = mongoose.model('user', userschema);
module.exports = user;
