import * as fs from "fs/promises";
import * as path from "path";

const ls = async (currentDir) => {
  try {
    const allFilesAndDirs = await fs.readdir(currentDir, {
      withFileTypes: true,
    });
    const filesAndDirs = await Promise.all(
      allFilesAndDirs
        .filter((entry) => !entry.name.startsWith("."))
        .map(async (entry) => {
          const stats = await fs
            .stat(path.join(currentDir, entry.name))
            .catch(() => null);
          return {
            Name: entry.name,
            Type: stats
              ? stats.isDirectory()
                ? "directory"
                : "file"
              : "unknown",
          };
        })
    );

    console.table(filesAndDirs);
  } catch (err) {
    console.error("Error reading directory:", err.message);
  }
};

export default ls;
