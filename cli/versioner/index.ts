import { prompt, QuestionCollection } from "inquirer";

import { Printer } from "@/cli/utils/color";
import { Versioner } from "@/cli/versioner/core/versioner";
import { MainArgs, versionProcesses } from "@/cli/versioner/core/types";

const cliIntro = `
${Printer.color(["Bright", "FgMagenta"], "Iniciando el Versioner CLI")}

Este CLI permite ejecutar cambios de versión del proyecto de forma automatizada.
Permite hacer incrementos de versión mayor, minor, parche, release, entre otros,
creado  automáticamente el  commit en el historial de  versionado y generando el 
Git tag  correspondiente. Este  sistema de  versionado persigue y se  basa en la
especificación "Semantic Versioning" versión 2.0.0.

A  continuación se  describe los  diferentes  cambios de  versión que se  pueden 
ejecutar.
`;

const cliGeneratorTypesList = `${Printer.color(
  ["Bright", "Underscore"],
  "major"
)}
Incrementa la versión mayor del proyecto en 1. Por ejemplo: ${Printer.color(
  "BgCyan",
  "2.0.0 -> 3.0.0"
)} .
Este versionado debe usarse cuando se realizan cambios de incompatibilidad en el
API (comúnmente llamados "Breaking Changes"), es decir, los cambios causarán que
los consumidores del API deban hacer cambios en su consumo.

${Printer.color(["Bright", "Underscore"], "minor")}
Incrementa la versión menor del proyecto en 1. Por ejemplo: ${Printer.color(
  "BgCyan",
  "2.1.0 -> 2.2.0"
)} .
Este versionado debe usarse cuando se añade nueva funcionalidad o se modifica la
funcionalidad  existente, representando  cambios en el  comportamiento del  API, 
pero manteniendo  completamente la  retrocompatibilidad  para los  consumidores.

${Printer.color(["Bright", "Underscore"], "patch")}
Incrementa la versión parche del proyecto en 1. Por ejemplo: ${Printer.color(
  "BgCyan",
  "2.1.0 -> 2.1.1"
)} .
Este  versionado  debe  usarse  cuando  se  reparan  errores  en  el  API,  pero 
manteniendo completamente la retrocompatibilidad para los consumidores.

${Printer.color(["Bright", "Underscore"], "premajor")}
Añade si no  contiene, e incrementa la versión  pre-mayor del proyecto en 1. Por 
ejemplo: ${Printer.color("BgCyan", "2.0.0 -> 2.0.0-1 -> 2.0.0-2")} . 
Este  versionado  debe  usarse  durante la  etapa de  testing e  integración  de 
versiones  mayores  que  provienen  de la  rama de  desarrollo. Este  versionado 
refleja los  cambios que se  producen  entre la rama de  desarrollo y la rama de 
testing, que  prepara  la  versión  mayor que se  desea  publicar. Esta  versión 
precede a el versionado de release.

${Printer.color(["Bright", "Underscore"], "preminor")}
Añade si no contiene, e  incrementa la versión  pre-menor del proyecto en 1. Por 
ejemplo: ${Printer.color("BgCyan", "2.1.0 -> 2.1.0-1 -> 2.1.0-2")} . 
Este  versionado  debe  usarse  durante la  etapa de  testing e  integración  de 
versiones  menor  que  provienen  de  la  rama  de  desarrollo. Este  versionado 
refleja los  cambios que se  producen entre la  rama de desarrollo y la  rama de 
testing,  que prepara  la versión  menor  que  se desea  publicar. Esta  versión 
precede a el versionado de Release.

${Printer.color(["Bright", "Underscore"], "release")}
Añade si no  contiene, e incrementa la  versión  release del  proyecto en 1. Por 
ejemplo: ${Printer.color(
  "BgCyan",
  "2.0.0 -> 2.0.0-release.1 -> 2.0.0-release.2"
)} . 
Si se produce  una versión de release  exitosa, se debe aplicar el incremento de 
versión mayor o menor final. Este  versionado debe usarse cada vez que se genera 
un cambio  durante la  rama de  release. Todo  código de metadata o  cambios por 
release  se deben  producir dentro de  la rama de  release, usando este  tipo de 
versionado, sin excepción.
`;

const mainQuestions: QuestionCollection<MainArgs> = [
  {
    type: "list",
    name: "version",
    message: Printer.color(
      "FgGreen",
      "¿Qué tipo de incremento de versión deseas aplicar?"
    ),
    choices: versionProcesses,
  },
];

export class VersionerCLI {
  private versioner: Versioner;
  private mainQuestions: QuestionCollection<MainArgs> = mainQuestions;

  constructor() {
    this.versioner = new Versioner();
  }

  execute() {
    console.log(cliIntro);
    console.log(cliGeneratorTypesList);

    prompt(this.mainQuestions).then((mainResult) => {
      this.versioner.execute(mainResult);
    });
  }
}
