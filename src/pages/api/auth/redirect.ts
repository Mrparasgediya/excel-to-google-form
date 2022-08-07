import { serialize } from "cookie";
import { OAuth2Client } from "google-auth-library";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";
import { NextApiRequest, NextApiResponse } from "next";
import { getOAuthClient, getTokenFromCode } from "../../../utils/google";
import { signJWT } from "../../../utils/jwt";


const authRedirectGetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const codeToDecode: string = req.query.code as string;
        if (!codeToDecode)
            throw new Error("Please Login Again!");

        const code: string = decodeURIComponent(codeToDecode);

        const client: OAuth2Client = getOAuthClient();

        const { tokens: { access_token } }: GetTokenResponse = await getTokenFromCode(client, code);
        if (!access_token)
            throw new Error("Please login again");

        const userToken: string = signJWT(access_token);
        res.setHeader('Set-Cookie', serialize('token', userToken, { httpOnly: true, secure: true, path: '/', sameSite: 'strict', maxAge: (60 * 60) }))
        return res.redirect('/');
    } catch (error) {
        return res.status(400).send({ message: (error as Error).message })
    }
}

const authRedirectHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            return authRedirectGetHandler(req, res);
        default:
            return res.status(405).send({ message: `Method ${req.method} is not allowed!` })
    }
}

export default authRedirectHandler; 