import { sign, verify } from 'jsonwebtoken'
import config from '../config'
import { VerifiedJWTPayload } from '../types/jwt.types'

export const signJWT = (token: string) => sign({
    token,
    exp: Math.floor(Date.now() / 100) + (60)
}, config.JWT_SECRET)


export const verifyJWT = (jwt: string): VerifiedJWTPayload => verify(jwt, config.JWT_SECRET)
