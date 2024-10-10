import * as fs from "fs/promises";
import * as path from "path";
import crypto from "crypto";
import { OPERATION_FAILED } from "../constans.js";

const hash = async (input, currentDir) => {
  const inputPath = path.isAbsolute(input.split(" ")[1].trim())
    ? input.split(" ")[1].trim()
    : path.join(currentDir, input.split(" ")[1].trim());
  try {
    const hash = crypto.createHash("sha256");
    const data = await fs.readFile(inputPath);
    hash.update(data);
    const result = hash.digest("hex");
    console.log(result);
  } catch (error) {
    console.log(`${OPERATION_FAILED}`);
  }
};

export default hash;
