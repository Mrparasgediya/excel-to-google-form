import multer from 'multer'

const multerMiddleware = multer({
    fileFilter(req, file, callback) {
        const isValidFile: boolean = file.originalname.endsWith('.xlsx')
        if (!isValidFile) {
            callback(new Error('Please enter file that has .xlsx format'));
        } else {
            callback(null, true);
        }
    },
})

export default multerMiddleware;