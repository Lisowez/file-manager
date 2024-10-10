import * as fs from "fs/promises";
import * as path from "path";
import { OPERATION_FAILED } from "../constans.js";

const rn = async (input, currentDir) => {
  const inputPath = path.isAbsolute(input.split(" ")[1].trim())
    ? input.split(" ")[1].trim()
    : path.join(currentDir, input.split(" ")[1].trim());

  // const newPath = path.isAbsolute(input.split(" ")[2].trim())
  //   ? input.split(" ")[2].trim()
  //   : path.join(currentDir, input.split(" ")[2].trim());
  const newPath = path.join(
    path.dirname(inputPath),
    input.split(" ")[2].trim()
  );
  try {
    await fs.access(inputPath, fs.constants.R_OK);
    await fs.rename(inputPath, newPath);
  } catch (error) {
    console.error(`${OPERATION_FAILED}`);
  }
};

export default rn;
