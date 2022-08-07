import { NextApiResponse } from "next"
import https from 'https'
import { serialize } from 'cookie'
import authMiddleware from "../../../middlewares/auth.middleware";
import { AuthNextApiRequest } from "../../../types/req.types";
import { runMiddleware } from "../../../utils/middleware";

const logoutGetRequestHandler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
    try {
        // run middleware
        await runMiddleware(req, res, authMiddleware)
        // Build the string for the POST request
        let postData = "token=" + req.auth.credentials.access_token;

        // post options to revoke all of the access which are used in this website
        let postOptions = {
            host: 'oauth2.googleapis.com',
            port: '443',
            path: '/revoke',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const postReq = https.request(postOptions, function (res) {
            res.setEncoding('utf8');
            // calls when data is get
            res.on('data', d => {
            });
        });

        postReq.on('error', error => {
            throw new Error((error as Error).message);
        });

        postReq.write(postData);
        postReq.end();

        res.setHeader('Set-Cookie', serialize('token', '', {
            expires: new Date(0),
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: '/'
        }))
        return res.send({ message: "Logout Successfully" });
    } catch (error) {
        return res.send({ message: (error as Error).message })
    }
}


const logoutHandler = (req: AuthNextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            return logoutGetRequestHandler(req, res);
        default:
            return res.status(405).send({ message: `Method ${req.method} is not Allowed!` })
    }
}

export default logoutHandler