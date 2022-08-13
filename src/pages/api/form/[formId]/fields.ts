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
        const formRes: { error?: { message: string }, [key: string]: any } = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
            method: 'POST',
            body: JSON.stringify({ requests: getRequestForForm(formFields) }),
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })
        if (formRes.error) {
            throw new Error(formRes.error.message)
        }
        return res.send({ message: "Form fields added successfully!" })
    } catch (error) {
        return res.status(400).send({ error: (error as Error).message })
    }
}

const formFieldsHandler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'PUT':
            return formFieldsPutHandler(req, res);
        default:
            return res.status(400).send({ error: `Method ${req.method} is not Allowed!` })
    }
}

export default formFieldsHandler