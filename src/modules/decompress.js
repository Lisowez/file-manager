import fs from "fs/promises";
import path from "path";
import zlib from "zlib";
import { createWriteStream, createReadStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { OPERATION_FAILED } from "../constans.js";

const decompress = async (input, currentDir) => {
  const inputPath = path.isAbsolute(input.split(" ")[1].trim())
    ? input.split(" ")[1].trim()
    : path.join(currentDir, input.split(" ")[1].trim());
  const newPath = path.join(
    path.isAbsolute(input.split(" ")[2].trim())
      ? input.split(" ")[2].trim()
      : path.join(currentDir, input.split(" ")[2].trim()),
    `${path.parse(inputPath).name}`
  );
  try {
    await fs.access(inputPath, fs.constants.R_OK);
    const gzip = zlib.createBrotliDecompress();
    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(newPath);
    await promisify(pipeline)(readStream, gzip, writeStream).catch(() =>
      console.error(OPERATION_FAILED)
    );
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
};

export default decompress;
