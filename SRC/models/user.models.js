import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    firstName : {
        type: String,
        required: true
    },
    loginID: {
        type: String,
    },
    lastName : {
        type: String,
        required: true
    },
    userName : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber : {
        type: String,
        required: true,
        unique : true
    },
    gender : {
        type: String,
        enum: ['Male', 'Female',],
        required: true
    },
    nationality : {
        type: String,
        required: true
    },
    followers: {
        type: [String],
        count: 0,
        default : []
    },
    following: {
        type: [String],
        count: 0,
        default : []
    },
    role: {
        type : String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    bio: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        default: null,
    }
})

const User = mongoose.model('User', userSchema)
export default User