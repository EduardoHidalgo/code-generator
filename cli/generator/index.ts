import { prompt, QuestionCollection } from "inquirer";

import { Printer } from "@/cli/utils/color";
import {
  apiVersions,
  GenerationTypeEnum,
  generationTypes,
} from "@/cli/generator/core/types";
import {
  Generator,
  GeneratorArgs,
  GeneratorMainArgs,
  GeneratorMetadataArgs,
} from "@/cli/generator/core/generator";

const cliIntro = `
${Printer.color(["Bright", "FgMagenta"], "Iniciando el Generator CLI")}

Este CLI es usado para  ejecutar el Generador de  código de Violet. Podrás crear
de forma automatizada gran parte de código  repetitivo para el API de Violet con
facilidad. A  continuación se  describen  los tipos  de  generación  soportados.
`;

const cliGeneratorTypesList = `${Printer.color(
  ["Bright", "Underscore"],
  "BusinessOnly"
)}
Genera todo el código necesario para integrar correctamente el Business Layer de
un dominio.

${Printer.color(["Bright", "Underscore"], "Full")}
Genera  todo el  código de todos los  endpoints que un  dominio  puede  exponer, 
incluyendo todos los features de Violet.

${Printer.color(["Bright", "Underscore"], "Metadata")}
Generá el código de un dominio de metadatos. Normalmente este código es un apoyo
de otro dominio.

${Printer.color(["Bright", "Underscore"], "Simple")}
Genera el  código de un dominio  únicamente incluyendo los  endpoints y features
mínimos para poder operar el API correctamente.

${Printer.color(["Bright", "Underscore"], "WeakCatalog")}
Genera el  mínimo código  necesario  para operar un  catálogo débil desde el API 
(por ejemplo: Tipos, Estatus, etc).
`;

const mainQuestions: QuestionCollection<GeneratorMainArgs> = [
  {
    type: "list",
    name: "version",
    message: Printer.color("FgGreen", "¿Qué versión de API deseas generar?:"),
    choices: apiVersions,
  },
  {
    type: "list",
    name: "generationType",
    message: Printer.color(
      "FgGreen",
      "¿Que tipo de generación de código deseas usar?:"
    ),
    choices: generationTypes,
  },
  {
    type: "input",
    name: "domain",
    default: "JobService",
    message: Printer.color(
      "FgGreen",
      "Introduce el nombre del dominio al que pertenece el recurso (por ejemplo, JobServices, Clients):"
    ),
  },
  {
    type: "input",
    name: "subdomain",
    default: "JobService",
    message: Printer.color(
      "FgGreen",
      "Introduce el nombre del subdominio al que pertenece el recurso (por ejemplo, JobService, JobServiceMetadata):"
    ),
  },
  {
    type: "input",
    name: "dbName",
    default: "job_service",
    message: Printer.color(
      "FgGreen",
      "Introduce el nombre de la tabla en DB que se relaciona con el recurso (por ejemplo, job_service, jobServiceMetadata):"
    ),
  },
];

const metadataQuestions: QuestionCollection<GeneratorMetadataArgs> = [
  {
    type: "input",
    name: "metadataRelation",
    default: "job_service",
    message: Printer.color(
      "FgGreen",
      "Introduce el nombre de la tabla en DB que relaciona este recurso de metadata con su subdominio (por ejemplo, job_service):"
    ),
  },
  {
    type: "input",
    name: "metadataRelationField",
    default: "jobServiceId",
    message: Printer.color(
      "FgGreen",
      "Introduce el nombre del campo que relaciona este recurso de metadata con su subdominio (por ejemplo, jobServiceId):"
    ),
  },
];

export class GeneratorCLI {
  mainQuestions: QuestionCollection<GeneratorMainArgs> = mainQuestions;
  metadataQuestions: QuestionCollection<GeneratorMetadataArgs> =
    metadataQuestions;

  constructor() {}

  execute() {
    console.log(cliIntro);
    console.log(cliGeneratorTypesList);

    prompt(this.mainQuestions).then((mainResult) => {
      if (mainResult.generationType == GenerationTypeEnum.metadata) {
        prompt<GeneratorMetadataArgs>(this.metadataQuestions).then(
          (metadataResult) => {
            this.executeGenerator({ ...mainResult, ...metadataResult });
          }
        );
      } else {
        this.executeGenerator(mainResult);
      }
    });
  }

  private executeGenerator(result: GeneratorArgs) {
    try {
      Printer.log(
        "FgGreen",
        "Configuración de CLI seleccionada:",
        JSON.stringify({ result })
      );

      const generator = new Generator(result);

      generator.execute();
    } catch (error) {
      console.error(error);
    }
  }
}
