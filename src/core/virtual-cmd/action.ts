import { historyLogs, userName } from "../../store/main";
import { CD_CMD, CLEAR_CMD, UN_RECOGNIZE_CMD, WHO_AM_I_CMD } from "./constants";
import { get } from "svelte/store";

const ACTIONS: Record<string, any> = {
  [CLEAR_CMD]: clearVirtualConsole,
  [UN_RECOGNIZE_CMD]: unRecognizeCommand,
  [WHO_AM_I_CMD]: whoAmICommand,
  [CD_CMD]: CDCommand,
};

function addLog(text: string) {
  historyLogs.update((prev) => [...prev, { type: "output", text }]);
}

function triggerEcho(rawCMD: string) {
  let logAddition: any[] = [
    { type: "echo", text: `${get(userName)} ->&nbsp;&nbsp;&nbsp;` + rawCMD },
  ];
  historyLogs.update((prev) => [...prev, ...logAddition]);
}

Object.keys(ACTIONS).forEach((key: string) => {
  const oldFunc = ACTIONS[key];
  ACTIONS[key] = (...args) => {
    triggerEcho(args[0]);
    oldFunc(args[0]);
  };
});

// ─── Action Funcs ───────────────────────────────────────────────────────────────
function clearVirtualConsole(rawCMD: string) {
  historyLogs.set([]);
}

function unRecognizeCommand(rawCMD: string) {
  //mathematical-expression-check
  const mathematicalExpressionRegex =
    /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

  if (mathematicalExpressionRegex.test(rawCMD)) {
    const result: any = eval(rawCMD);
    addLog(`
    <div class="log_text">
      -> ${result}
    </div>
    `);
    return;
  }
  //-----------------------------

  addLog(`
  <div class="log_text">
      -> command is not found --> type "helpme" to see the available cmds
  </div>
  `);
}

function whoAmICommand(rawCMD: string) {
  addLog(`
  <div class="log_text">
      -> definitely not root, you are ${get(userName)}
  </div>
  `);
}

function CDCommand(rawCMD: string) {
  console.log(rawCMD);
  addLog(`
  <div class="log_text">
      -> cd thru directories is still WIP feature
  </div>
  `);
}
// ────────────────────────────────────────────────────────────────────────────────

export default ACTIONS;
