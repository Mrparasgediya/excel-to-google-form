import { sign, verify } from 'jsonwebtoken'
import config from 'config'
import { VerifiedJWTPayload } from 'types/jwt.types'

export const signJWT = (token: string) => sign({
    token,
}, config.JWT_SECRET, { expiresIn: "8hr" })


export const verifyJWT = (jwt: string): VerifiedJWTPayload => verify(jwt, config.JWT_SECRET)
