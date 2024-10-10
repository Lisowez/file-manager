import path from "path";
import * as fs from "fs/promises";
import { OPERATION_FAILED } from "../constans.js";

const rm = async (input, currentDir) => {
  const inputPath = path.isAbsolute(input.split(" ")[1].trim())
    ? input.split(" ")[1].trim()
    : path.join(currentDir, input.split(" ")[1].trim());
  try {
    await fs.access(inputPath, fs.constants.R_OK);
    await fs.rm(inputPath);
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
};

export default rm;
