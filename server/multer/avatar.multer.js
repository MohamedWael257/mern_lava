import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./server/uploads/avatar");
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split("/")[1];
        const fileame = `User-${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.${ext}`;
        callback(null, fileame);
    },
});

const fileFilter = (req, file, callback) => {
    const TYPE = file.mimetype.split("/")[0];
    if (TYPE === "image") {
        callback(null, true);
    } else {
        callback(null, false);
    }
};
const upload_avatar = multer({ storage: storage, fileFilter: fileFilter });
export default upload_avatar