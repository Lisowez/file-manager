import { createReadStream, createWriteStream } from "fs";
import * as path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { OPERATION_FAILED } from "../constans.js";

const cp = async (input, currentDir) => {
  const inputPath = path.isAbsolute(input.split(" ")[1].trim())
    ? input.split(" ")[1].trim()
    : path.join(currentDir, input.split(" ")[1].trim());
  const nameFile = path.basename(inputPath);
  const newPath = path.join(
    path.isAbsolute(input.split(" ")[2].trim())
      ? input.split(" ")[2].trim()
      : path.join(currentDir, input.split(" ")[2].trim()),
    nameFile
  );
  const readStream = createReadStream(inputPath);
  const writeStream = createWriteStream(newPath);
  await promisify(pipeline)(readStream, writeStream).catch(() =>
    console.error(OPERATION_FAILED)
  );
};
export default cp;
