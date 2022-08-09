import authMiddleware from "middlewares/auth.middleware"
import { NextApiResponse } from "next"
import { IFormItem } from "types/file";
import { AuthNextApiRequest } from "types/req.types";
import { getRequestForForm } from "utils/form";
import { runMiddleware } from "utils/middleware"

const formHandler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
    // generate form 
    try {
        await runMiddleware(req, res, authMiddleware);
        if (!req.auth)
            throw new Error("Auth not found!");

        const { access_token } = req.auth.credentials;

        const formStructure = {
            info: {
                title: "Your Favourite Programming language",
                documentTitle: "The Programming language Suvery",
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
        res.send(response);

    } catch (error) {
        console.log('this is erro ', error);
        res.send({ message: (error as Error).message })
    }
}

export default formHandler;