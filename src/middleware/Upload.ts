import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});
// const filter = (req: any, file: any, cb: any) => {
//   if (
//     file.mimetype == "image/png" ||
//     file.mimetype == "image/jpg" ||
//     file.mimetype == "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({ storage: storage });

export default upload;
