import authMiddleware from "middlewares/auth.middleware";
import multerMiddleware from "middlewares/multer.middleware";
import { NextApiResponse } from "next";
import { FileNextApiRequest } from "types/req.types";
import { readWorksheet } from "utils/file";
import { runMiddleware } from "utils/middleware";
import XLSX, { WorkSheet } from 'xlsx'

export const config = {
    api: {
        bodyParser: false
    }
}

const fileUploadGetHandler = async (req: FileNextApiRequest, res: NextApiResponse) => {
    try {
        await runMiddleware(req, res, authMiddleware);
        await runMiddleware(req, res, multerMiddleware.single('file'));
        const workSheet: WorkSheet = XLSX.read(req.file.buffer, { type: "buffer", cellDates: true })
        const readOutput = readWorksheet(workSheet);
        return res.send({ readOutput });
    } catch (error) {
        return res.status(400).send({ message: (error as Error).message })
    }
}


const fileUploadHandler = (req: FileNextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            return fileUploadGetHandler(req, res);
        default:
            return res.send({ message: `Method ${req.method} is not Allowed!` });
    }
}

export default fileUploadHandler;
