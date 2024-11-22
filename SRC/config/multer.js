import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

const checkFileType = (file, cb) => {
    const fileTypes = /jpeg|jpg|svg|png|mp4/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mime = fileTypes.test(file.mime)

    if (mime && extname) {
        return cb(null, true)
    } else {
        cb(new Error('ERROR: Kindly upload a valid file type'))
    }
}
