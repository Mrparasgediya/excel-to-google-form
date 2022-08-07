import { NextApiRequest, NextApiResponse } from "next";

const tokenHandler = (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            return res.send({ token: req.cookies.token });
        default:
            return res.status(405).send({ message: `Method ${req.method} is not Allowed!` });
    }
}
export default tokenHandler;