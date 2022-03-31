import { prompt, QuestionCollection } from "inquirer";

import { Printer } from "@/cli/utils/color";
import { CliMainArgs, processes } from "@/cli/core/types";
import { DatabaseManagerCLI } from "@/cli/database";
import { GeneratorCLI } from "@/cli/generator/index";
import { VersionerCLI } from "@/cli/versioner";

const cliIntro = `${Printer.color(
  ["Bright", "FgMagenta"],
  "Bienvenido al Code Generator CLI!"
)}

Este CLI maneja  todos los  procesos de  servidor del API , ejecuta subprocesos
de mantenimiento, comunica con otros CLI's con más subprocesos, o ejecuta tareas
de  servidor que  completan  operaciones  de  desarrollo. La  lista de  procesos 
disponibles se describe a continuación.
`;

const cliProcessesList = `${Printer.color(
  ["Bright", "Underscore"],
  "DatabaseManager"
)}
Comunica  con  el "DatabaseManager CLI" el cual permite  ejecutar procesos de la 
base de  datos como: Generación de  tipado de Prisma, construir o  actualizar el 
balanceador de bases de datos, precargar la configuración de las bases de datos,
etc.

${Printer.color(["Bright", "Underscore"], "Generator")}
Comunica con el "Generator CLI" el cual permite generar código para el API de 
forma automatizada.


${Printer.color(["Bright", "Underscore"], "Versioner")}
Comunica con el "Versioner CLI" el cual permite actualizar la versión semántica
del  proyecto  entero  (ubicado  en  el  package.json). Automáticamente  ejecuta 
cambios de  versión, genera el  commit  relacionado en el  historial  de  Git, y 
genera el tag de Git.
`;

const mainQuestions: QuestionCollection<CliMainArgs> = [
  {
    type: "list",
    name: "process",
    message: Printer.color(
      "FgGreen",
      "Selecciona el proceso que deseas ejecutar:"
    ),
    choices: processes,
  },
];

export class CodeGeneratorCLI {
  private databaseManagerCLI: DatabaseManagerCLI;
  private generatorCLI: GeneratorCLI;
  private versionerClI: VersionerCLI;

  private mainQuestions: QuestionCollection<CliMainArgs> = mainQuestions;

  constructor() {
    this.databaseManagerCLI = new DatabaseManagerCLI();
    this.generatorCLI = new GeneratorCLI();
    this.versionerClI = new VersionerCLI();
  }

  execute() {
    console.log(cliIntro);
    console.log(cliProcessesList);

    prompt(this.mainQuestions).then((mainResult) => {
      this.mainProcess(mainResult);
    });
  }

  private mainProcess(mainResult: CliMainArgs) {
    switch (mainResult.process) {
      case "DatabaseManager":
        return this.databaseManagerCLI.execute();
      case "Generator":
        return this.generatorCLI.execute();
      case "Versioner":
        return this.versionerClI.execute();
      default:
        Printer.log(
          "FgRed",
          "No existe ningún proceso de servidor disponible para esa opción seleccionada. Esto no debe suceder."
        );
        break;
    }
  }
}
