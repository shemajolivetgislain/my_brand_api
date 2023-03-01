import multer from "multer";

const upload = multer({ dest: "uploads/images/" });

export default upload;
