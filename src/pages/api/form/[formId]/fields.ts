import authMiddleware from "middlewares/auth.middleware"
import { NextApiResponse } from "next"
import { AuthNextApiRequest } from "types/req.types"
import { getRequestForForm } from "utils/form"
import { runMiddleware } from "utils/middleware"




const formFieldsPutHandler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
    const { formId } = req.query;
    const formFields = req.body.fields;
    try {
        await runMiddleware(req, res, authMiddleware)
        if (!req.auth)
            throw new Error("Auth not found!");
        if (!formFields)
            throw new Error("Enter form fields data");
        const { access_token } = req.auth.credentials;
        const formRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
            method: 'POST',
            body: JSON.stringify({ requests: getRequestForForm(formFields) }),
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        return res.send({ message: "Form updated successfully!" })
    } catch (error) {
        return res.status(400).send({ message: (error as Error).message })
    }
}

const formFieldsHandler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'PUT':
            return formFieldsPutHandler(req, res);
        default:
            return res.status(400).send({ message: `Method ${req.method} is not Allowed!` })
    }
}

export default formFieldsHandler