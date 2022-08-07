import { NextApiRequest, NextApiResponse } from "next";

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, middleware: any) => {
    return new Promise((resolve, reject) => {
        middleware(req, res, (next: any) => {
            if (next instanceof Error) reject(next);
            resolve(next);
        })
    })
}