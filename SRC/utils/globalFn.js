import cryptoHash from 'crypto'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function hashValue(value) {
    const hash = cryptoHash.createHash('sha256')
    hash.update(value)
    return hash.digest('hex')
}

export function comparePassword(inputPassword, hashedPassword) {
    return hashValue(inputPassword) === hashedPassword
}

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : '3d'
    })

    return token
}