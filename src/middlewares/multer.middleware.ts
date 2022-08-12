import multer from 'multer'

const multerMiddleware = multer({
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb
    },
    fileFilter(req, file, callback) {
        const isValidFile: boolean = file.originalname.endsWith('.xlsx') || file.originalname.endsWith('.xls')
        if (!isValidFile) {
            callback(new Error('Please enter file that has .xlsx or .xls format'));
        } else {
            callback(null, true);
        }
    },
})

export default multerMiddleware;