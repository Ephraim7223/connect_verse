import cryptoHash from 'crypto'
export function hashValue(value) {
    const hash = cryptoHash.createHash('sha256')
    hash.update(value)
    return hash.digest('hex')
}

export function comparePassword(inputPassword, hashedPassword) {
    return hashValue(inputPassword) === hashedPassword
}
