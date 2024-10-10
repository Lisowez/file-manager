import { createReadStream } from "fs";
import * as fs from "fs/promises";
import { stdout } from "process";
import { OPERATION_FAILED } from "../constans.js";
import * as path from "path";

const cat = async (input, currentDir) => {
  const inputPath = path.isAbsolute(input.split(" ")[1].trim())
    ? input.split(" ")[1].trim()
    : path.join(currentDir, input.split(" ")[1].trim());
  try {
    await fs.access(inputPath, fs.constants.R_OK);
  } catch (error) {
    console.error(`${OPERATION_FAILED}`);
    return;
  }

  const stream = createReadStream(inputPath, "utf-8");
  stream.on("data", (data) => {
    stdout.write(data);
  });
  stream.on("error", (error) => {
    throw error;
  });
};

export default cat;
