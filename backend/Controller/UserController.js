const User = require('../Models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

//Signup
const register = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        if (!name || !email || !password || !gender) {
            return res.status(400).json({ message: "All fields are required!" })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User alredy exists!" })
        }

        const hasepassword = await bcrypt.hash(password, 10)

        const malephoto = `https://avatar.iran.liara.run/public/boy?name=${name}`
        const girlphoto = `https://avatar.iran.liara.run/public/girl?name=${name}`

        await User.create({
            name,
            email,
            password: hasepassword,
            profilephoto: gender === "male" ? malephoto : girlphoto,
            gender
        })
        return res.status(201).json({
            message: "Account create successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


//Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const ispasswordmatch = await bcrypt.compare(password, user.password)
        if (!ispasswordmatch) {
            return res.status(400).json({ message: "Incorrect Password" })
        }
        const tokendata = {
            userid: user._id
        }
        const token = await jwt.sign(tokendata, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        return res.status(201).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            _id: user._id,
            name: user.name,
            profilephoto: user.profilephoto,
            message: "Login successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}


//Logout
const logout = async (req, res) => {
    try {
        return res.status(201).cookie("token", "", { maxAge: 0 }).json({ message: "Logout Successfully" })
    } catch (error) {

    }
}

//Display Othre user
const getOtheruser = async (req, res) => {
    try {
        const loginuser = req.id;
        const otheruser = await User.find({ _id: { $ne: loginuser } }).select("-password");
        return res.status(200).json(otheruser);
    } catch (error) {
        console.log(error)
    }
}

module.exports = { register, login, logout, getOtheruser }; 

