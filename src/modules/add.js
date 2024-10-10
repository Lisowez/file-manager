import * as fs from "fs/promises";
import * as path from "path";
import { OPERATION_FAILED } from "../constans.js";

const add = async (input, currentDir) => {
  const newFilePath = path.join(currentDir, input.split(" ")[1].trim());
  try {
    await fs.access(newFilePath, fs.constants.F_OK);
    console.error(OPERATION_FAILED + 1);
  } catch {
    try {
      await fs.writeFile(newFilePath, "");
    } catch (error) {
      console.error(OPERATION_FAILED + 2);
    }
  }
};

export default add;
