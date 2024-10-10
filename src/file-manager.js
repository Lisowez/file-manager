import { homedir } from "os";
import path from "path";
import * as fs from "fs/promises";
import readline from "readline";
import {
  WELCOME_TEXT,
  BYE_TEXT,
  CURRENTLY_IN,
  INVALID_INPUT,
  OPERATION_FAILED,
} from "./constans.js";

import ls from "./modules/ls.js";
import cd from "./modules/cd.js";
import cat from "./modules/cat.js";
import add from "./modules/add.js";
import rn from "./modules/rn.js";
import cp from "./modules/cp.js";
import mv from "./modules/mv.js";
import rm from "./modules/rm.js";
import osInfo from "./modules/osInfo.js";
import hash from "./modules/hash.js";

const args = process.argv.slice(2);

const fileManager = async () => {
  let currentDir = homedir();
  const name = args[0].slice(2).split("=")[1];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  console.log(`${WELCOME_TEXT}${name}!`);
  console.log(`${CURRENTLY_IN} ${currentDir}`);
  rl.prompt();

  rl.on("line", async (input) => {
    if (input === ".exit") {
      rl.close();
    } else {
      switch (input) {
        case "up":
          currentDir = path.dirname(currentDir);
          break;
        case "ls":
          await ls(currentDir);
          break;
        case `cd ${input.split(" ")[1]}`:
          currentDir = (await cd(currentDir, input)) ?? currentDir;
          break;
        case `cat ${input.split(" ")[1]}`:
          await cat(input, currentDir);
          break;
        case `add ${input.split(" ")[1]}`:
          await add(input, currentDir);
          break;

        case `rn ${input.split(" ")[1]} ${input.split(" ")[2]}`:
          await rn(input, currentDir);
          break;
        case `cp ${input.split(" ")[1]} ${input.split(" ")[2]}`:
          cp(input, currentDir);
          break;
        case `mv ${input.split(" ")[1]} ${input.split(" ")[2]}`:
          mv(input, currentDir);
          break;

        case `rm ${input.split(" ")[1]}`:
          await rm(input, currentDir);
          break;
        case `os ${input.split(" ")[1]}`:
          osInfo(input.split(" ")[1]);
          break;
        case `hash ${input.split(" ")[1]}`:
          hash(input, currentDir);
          break;
        default:
          console.log(INVALID_INPUT);
          break;
      }
      console.log(`${CURRENTLY_IN} ${currentDir}`);
      rl.prompt();
    }
  });

  rl.on("close", () => {
    console.log(`${BYE_TEXT} ${name}, goodbye!`);
    process.exit(0);
  });
};
await fileManager();
