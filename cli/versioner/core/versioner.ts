import { execSync } from "child_process";

import { Printer } from "@/cli/utils/color";
import { MainArgs } from "@/cli/versioner/core/types";

export class Versioner {
  constructor() {}

  execute(args: MainArgs) {
    switch (args.process) {
      case "major":
        return this.runProcess("npm version major");
      case "minor":
        return this.runProcess("npm version minor");
      case "patch":
        return this.runProcess("npm version patch");
      case "premajor":
        return this.runProcess("npm version premajor --preid=pre.");
      case "preminor":
        return this.runProcess("npm version preminor --preid=pre.");
      case "release":
        return this.runProcess("npm version release --preid=release.");
      default:
        Printer.log(
          "FgRed",
          "No existe ningún proceso de versionado disponible para esa opción seleccionada. Esto no debe suceder."
        );
        break;
    }
  }

  private runProcess(process: string) {
    try {
      execSync(process, { stdio: "inherit" });
      this.tagVersion();
    } catch (error) {
      console.log({ error });
    }
  }

  private tagVersion() {
    const version = process.env.npm_package_version;

    try {
      execSync(`git tag ${version}`, { stdio: "inherit" });
    } catch (error) {
      console.log({ error });
    }
  }
}
