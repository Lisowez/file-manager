import * as fs from "fs/promises";
import * as path from "path";

const cd = async (currentDir, input) => {
  const inputPath = path.isAbsolute(input.split(" ")[1].trim())
    ? input.split(" ")[1].trim()
    : path.join(currentDir, input.split(" ")[1].trim());
  try {
    await fs.access(inputPath, fs.constants.R_OK);
    console.log(inputPath);
    return inputPath;
  } catch (error) {
    console.error(
      `Error changing directory to "${inputPath}": ${error.message}`
    );
  }
};

export default cd;
