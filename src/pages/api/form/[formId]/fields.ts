import authMiddleware from "middlewares/auth.middleware"
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { AuthNextApiRequest } from "types/req.types"
import { getRequestForForm } from "utils/form"
import { runMiddleware } from "utils/middleware"

const formFieldsHandler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, authMiddleware)
    const { formId } = req.query;
    const { credentials: { access_token } } = req.auth;
    const formFields = req.body.fields;
    try {
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
        console.log(await formRes.json());
        return res.send({ message: "heloo world" })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: (error as Error).message })
    }
}

export default formFieldsHandler