export interface IStoreMappedSubscribeMetaData<T> {
  storeValue: string;
  target: T;
}

export interface IHistoryLog {
  type: "echo" | "output";
  text: string;
}
