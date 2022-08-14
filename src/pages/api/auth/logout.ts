import { NextApiResponse } from "next"
import { serialize } from 'cookie'
import authMiddleware from "middlewares/auth.middleware";
import { AuthNextApiRequest } from "types/req.types";
import { runMiddleware } from "utils/middleware";

const logoutGetRequestHandler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
    try {
        // run middleware
        await runMiddleware(req, res, authMiddleware)

        // revoke access from token
        await fetch('https://oauth2.googleapis.com/revoke', {
            method: "POST",
            body: JSON.stringify({ token: req.auth.credentials.access_token })
        })
        // remove cookie from client side
        res.setHeader(
            "Set-Cookie",
            [
                serialize("token", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 0,
                    path: "/",
                })
            ]
        );

        return res.send({ message: "Logout Successfully" });
    } catch (error) {
        return res.status(400).send({ error: (error as Error).message })
    }
}


const logoutHandler = (req: AuthNextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            return logoutGetRequestHandler(req, res);
        default:
            return res.status(405).send({ message: `Method ${req.method} is not Allowed!` })
    }
}

export default logoutHandler