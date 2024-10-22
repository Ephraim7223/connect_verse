import {z} from 'zod'

export const signUpValidator = z.object({
    firstName : z.string(),
    lastName : z.string(),
    userName : z.string(),
    password : z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    nationality: z.string(),
    gender: z.string()
}).required({message: 'All fields are required!!!'})

export const signInValidator = z.object({
    loginID: z.string(),
    password : z.string()
}).required({message: 'All fields are required!!!'})