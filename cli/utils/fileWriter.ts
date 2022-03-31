import { writeFileSync, mkdirSync, existsSync, writeFile } from "fs";
import appRoot from "app-root-path";

interface WriteArgs {
  data: string;
  fileName: string;
  path: string;
}

class FileWriter {
  private root: string;

  constructor() {
    const root = appRoot.path.replace("/cli/generator", "");
    this.root = root;
  }

  createFolder(path: string) {
    try {
      const dirPath = `${this.root}/${path}`;

      if (!existsSync(dirPath)) {
        console.log("createFolder:", { dirPath });

        mkdirSync(dirPath, {
          recursive: true,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  }

  ifFileExists(path: string): boolean {
    try {
      let exists = false;

      writeFile(path, "", { flag: "wx" }, (error) => {
        if (error) return false;

        exists = true;
      });

      console.log("ifFileExists:", { exists, path });

      return exists;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }

  write(args: WriteArgs) {
    try {
      const { data, fileName, path } = args;
      const filePath = `${this.root}/${path}/${fileName}`;

      this.createFolder(path);

      if (!this.ifFileExists(filePath)) {
        console.log("write:", { filePath });

        writeFileSync(filePath, data);
      }
    } catch (error) {
      console.log({ error });
    }
  }
}

export { FileWriter };
