export enum VersionProcessEnum {
  major = "major",
  minor = "minor",
  patch = "patch",
  premajor = "premajor",
  preminor = "preminor",
  release = "release",
}

export type VersionProcessType = keyof typeof VersionProcessEnum;

export const versionProcesses = Object.values(VersionProcessEnum);

export interface MainArgs {
  process: VersionProcessType;
}
