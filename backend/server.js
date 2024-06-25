const express = require('express')
const db = require('./db.js')
const cors = require('cors')
const {app, server} = require('./Socket/Socket.js');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
dotenv.config({});

const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOption))

const userroute = require('./Router/Userroute.js')
app.use('/api/user', userroute);

const messageroute = require('./Router/Messageroute.js')
app.use('/api/message', messageroute);

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    console.log(`Listing on ${PORT}`)

})