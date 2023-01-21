import path from "path";
import fs from "fs";

const RemoveImage = (file: string) => {
  console.log(file);
  const filepath: string = path.join(__dirname, "../../", "/public/", file);
  // console.log(__dirname);
  // console.log(filepath);
  file = path.join(__dirname, "../..", file);
  fs.unlink(filepath, (err) => {
    console.log(err);
  });
};

export default RemoveImage;
