import authMiddleware from "middlewares/auth.middleware"
import { NextApiResponse } from "next"
import { AuthNextApiRequest } from "types/req.types";
import { runMiddleware } from "utils/middleware"

const formPostHandler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
    try {
        const { title, documentTitle } = (req.body);
        await runMiddleware(req, res, authMiddleware);
        if (!req.auth)
            throw new Error("Auth not found!");

        const { access_token } = req.auth.credentials;

        const formStructure = {
            info: {
                title,
                documentTitle,
            }
        };
        const programmingLanguagesForm = await fetch("https://forms.googleapis.com/v1/forms", {
            body: JSON.stringify(formStructure),
            method: "POST",
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        const response = await programmingLanguagesForm.json();

        if (response.error) {
            throw new Error(response.error.message)
        }

        return res.send(response);

    } catch (error) {
        return res.send({ message: (error as Error).message })
    }
}

const formHandler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            return formPostHandler(req, res);
        default:
            return res.send({ message: `Method ${req.method} not Allowed!` });
    }
}

export default formHandler;