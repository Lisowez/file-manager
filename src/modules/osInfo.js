import * as os from "os";
import { INVALID_INPUT } from "../constans.js";

const osInfo = (tag) => {
  if (!tag.startsWith("--")) {
    console.error(INVALID_INPUT);
    return;
  }
  const tagName = tag.slice(2);
  switch (tagName) {
    case "EOL":
      console.log(os.EOL);
      break;
    case "arch":
      console.log(os.arch());
      break;
    case "cpus":
      console.log(os.cpus());
      break;
    case "homedir":
      console.log(os.homedir());
      break;
    case "username":
      console.log(os.userInfo().username);
      break;

    default:
      console.error(INVALID_INPUT);
      break;
  }
};

export default osInfo;
