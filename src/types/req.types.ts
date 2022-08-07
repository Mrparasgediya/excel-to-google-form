import { OAuth2Client } from "google-auth-library";
import { NextApiRequest } from "next";

export type AuthNextApiRequest = NextApiRequest & { auth: OAuth2Client }