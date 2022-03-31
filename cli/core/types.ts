export enum ProcessesEnum {
  DatabaseManager = "DatabaseManager",
  Generator = "Generator",
  Versioner = "Versioner",
}

export type ProcessesType = keyof typeof ProcessesEnum;

export const processes = Object.values(ProcessesEnum);

export interface CliMainArgs {
  process: ProcessesType;
}
