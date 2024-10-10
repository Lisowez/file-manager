import fs from "fs/promises";
import { createWriteStream, createReadStream } from "fs";
import path from "path";
import zlib from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";
import { OPERATION_FAILED } from "../constans.js";

const compress = async (input, currentDir) => {
  const inputPath = path.isAbsolute(input.split(" ")[1].trim())
    ? input.split(" ")[1].trim()
    : path.join(currentDir, input.split(" ")[1].trim());
  const newPath = path.join(
    path.isAbsolute(input.split(" ")[2].trim())
      ? input.split(" ")[2].trim()
      : path.join(currentDir, input.split(" ")[2].trim()),
    `${path.parse(inputPath).name}.br`
  );
  try {
    await fs.access(inputPath, fs.constants.R_OK);
    const gzip = zlib.createBrotliCompress();
    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(newPath);
    await promisify(pipeline)(readStream, gzip, writeStream).catch(() =>
      console.error(OPERATION_FAILED)
    );
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
};
export default compress;

