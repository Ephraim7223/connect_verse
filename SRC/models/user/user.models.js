import mongoose from "mongoose"; // Import mongoose to define MongoDB schemas and models

export const Gender = ['Male', 'Female']

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true // First name is required
    },
    lastName: {
        type: String,
        required: true // Last name is required
    },
    userName: {
        type: String,
        required: true // Username is required
    },
    loginID: {
        type: String,
    },
    password: {
        type: String,
        required: true // Password is required
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true // Ensure email is unique across all users
    },
    phoneNumber: {
        type: String,
        required: true, // Phone number is required
        unique: true // Ensure phone number is unique across all users
    },
    gender: {
        type: String,
        enum: Gender, // Gender must be either 'Male' or 'Female'
        required: true // Gender is required
    },
    nationality: {
        type: String,
        required: true // Nationality is required
    },
    followers: {
        type: [String], // Array of user IDs representing followers
        count: 0, // Count field (not stored, but can be used to track dynamically)
        default: [] // Default empty array for no followers initially
    },
    following: {
        type: [String], // Array of user IDs representing users this user is following
        count: 0, // Count field for dynamic use
        default: [] // Default empty array for no following initially
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Role can be either 'user' or 'admin'
        default: 'user' // Default role is 'user'
    },
    bio: {
        type: String, // Optional biography or description for the user
        required: false // Bio is not mandatory
    },
    otp: {
        type: String, // One-time password for verification or authentication purposes
        default: null // Default is null when no OTP is generated
    },
    isFrozen: {
        type: Boolean,
        default: false
    },
    falseLogin: {
        type: Number,
        default: null
    }
}, { timestamps: true }); // Add timestamps to record creation and update times automatically

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model to be used in other parts of the application
export default User;
