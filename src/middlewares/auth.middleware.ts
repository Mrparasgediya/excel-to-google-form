import { NextApiHandler, NextApiResponse } from "next";
import { OAuth2Client } from "google-auth-library";
import { JwtPayload } from "jsonwebtoken";
import { VerifiedJWTPayload } from "../types/jwt.types";
import { AuthNextApiRequest } from "../types/req.types";
import { getOAuthClient } from "../utils/google";
import { verifyJWT } from "../utils/jwt";

const authMiddleware = async (req: AuthNextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    try {
        const reqHeader = req.headers.authorization;
        if (!reqHeader)
            throw new Error("Enter token!");
        // verify token
        const token: VerifiedJWTPayload = verifyJWT(reqHeader.split(" ")[1]);
        // get auth client
        const authClient: OAuth2Client = getOAuthClient();
        // set authclient credentials from token
        authClient.setCredentials({ access_token: (token as JwtPayload).token })
        // set req.auth to authclient
        req.auth = authClient;
        return next(req, res);
    } catch (error) {
        return res.send({ message: (error as Error).message });
    }
}


export default authMiddleware;