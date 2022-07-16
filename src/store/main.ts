import { Writable, writable } from "svelte/store";
import type { IHistoryLog } from "../shared/interfaces/store.interfaces";

export const userName: Writable<string> = writable("unknown@anonymous");
export const historyLogs: Writable<IHistoryLog[]> = writable([]);

// ─── Actions ────────────────────────────────────────────────────────────────────
export function clearHistoryLogs() {
  historyLogs.set([]);
}
// ────────────────────────────────────────────────────────────────────────────────
