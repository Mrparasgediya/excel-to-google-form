import { OAuth2Client } from "google-auth-library";
import { Multer, } from "multer";
import { NextApiRequest } from "next";

export type AuthNextApiRequest = NextApiRequest & { auth: OAuth2Client }

export type FileNextApiRequest = NextApiRequest & { file: Express.Multer.File };