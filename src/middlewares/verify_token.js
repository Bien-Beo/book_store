import jwt from 'jsonwebtoken'
import { unauthorized, badRequest } from './handle-errors'

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return unauthorized('Require authorization', res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return unauthorized('Access token may be expired or invalid', res)
        
        req.user = user
        next()
    })
}

export default verifyToken