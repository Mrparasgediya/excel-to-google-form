import { NextApiRequest, NextApiResponse } from "next";
import { getAuthUrl, getOAuthClient } from "@utils/google";

const loginHandler = (req: NextApiRequest, res: NextApiResponse) => {
    return res.redirect(getAuthUrl(getOAuthClient()));
}

export default loginHandler;