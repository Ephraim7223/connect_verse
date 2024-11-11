import User from "../../models/user/user.models.js"
import { formatZodError } from "../../utils/errors.js"
import { comparePassword, generateToken, hashValue } from "../../utils/globalFn.js"
import { signInValidator, signUpValidator } from "../../validators/auth.validator.js"

export const Register = async(req, res) => {
    const registerValidator = signUpValidator.safeParse(req.body)
    if (!registerValidator.success) {
        return res.status(400).json(formatZodError(registerValidator.error.issues))
    }
    try {
        const {firstName, lastName, userName, password, email, phoneNumber, gender, nationality, age} = req.body 
        const user = await User.findOne({ $or: [{email}, {phoneNumber}, {userName}]})
        if (user) {
           return res.status(409).json({message: `user already exists`}) 
        }
        const encryption = hashValue(password)
        const newUser = new User({
            firstName,
            lastName,
            password: encryption,
            userName,
            gender,
            nationality,
            age,
            phoneNumber,
            email
        })
        await newUser.save()

        res.status(200).json({message: 'User created successfully', newUser})
        console.log('User created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

export const Login = async(req, res) => {
    const loginValidator = signInValidator.safeParse(req.body)
    if (!loginValidator.success) {
        return res.status(400).json(formatZodError(loginValidator.error.issues))
    }
    try {
        const {email, password} = req.body
       const user = await User.findOne({email})
       if (!user)
       {
        return res.status(400).json({message: `User with email: ${email} does not exist`})
    }
    const comparePw = comparePassword(password, user.password)
    if (!comparePw) {
        return res.status(400).json({message: "Password does not match"})
    }
    const accessToken = generateToken(user._id)
    console.log('User logged in successfully');
    res.status(200).json({message: 'User logged in successfully', accessToken})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

export const forgetPassword = async() => {
    try {
        
    } catch (error) {
        
    }
}

export const resetPassword = async() => {
    try {
        
    } catch (error) {
        
    }
}