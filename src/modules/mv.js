import { createReadStream, createWriteStream } from "fs";
import * as fs from "fs/promises";
import * as path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { OPERATION_FAILED } from "../constans.js";

const mv = async (input, currentDir) => {
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
  await promisify(pipeline)(readStream, writeStream)
    .then(async () => {
      try {
        await fs.access(newPath, fs.constants.F_OK);
        await fs.rm(inputPath);
      } catch (error) {
        console.error(OPERATION_FAILED);
      }
    })
    .catch((error) => {
      console.error(OPERATION_FAILED);
    });
};
export default mv;
