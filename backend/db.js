const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/chat-app'
// const mongoURL = 'mongodb+srv://preetpatel3504:<password>@chatwebapp.swoscve.mongodb.net/'

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to mongodb server');
})

db.on('disconnected', ()=>{
    console.log('Mongodb server disconnected');
})

db.on('error', (err)=>{
    console.log('Connection Error');
})

module.exports = db;