import ACTIONS from "./action";
import { UN_RECOGNIZE_CMD } from "./constants";

export class CMDReader {
  static getActionFromInput(inputCMD: string): Function | null {
    return ACTIONS.hasOwnProperty(inputCMD) ? ACTIONS[inputCMD] : null;
  }
  static executeCommand(inputCMD: string) {
    const actualCMD: string = inputCMD.split(" ")[0];
    const action = this.getActionFromInput(actualCMD);
    if (action) {
      action(inputCMD);
    } else {
      ACTIONS[UN_RECOGNIZE_CMD](inputCMD);
    }
  }
}
