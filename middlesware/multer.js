import multer from "multer";

const storage = multer.memoryStorage();
const maxSize = 1024 * 1024 * 100;
const upload = multer({storage , limits : {fileSize : maxSize }});

const fieldsupload = upload.fields([
     {name : "document" , maxCount  : 2 },
    
])

export default fieldsupload;