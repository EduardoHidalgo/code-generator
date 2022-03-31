import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const operationsIndexDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.businessOnly:
      return businessOnlyTemplate(args);
    case GenerationTypeEnum.full:
      return fullTemplate(args);
    case GenerationTypeEnum.metadata:
      return metadataTemplate(args);
    case GenerationTypeEnum.simple:
      return simpleTemplate(args);
    case GenerationTypeEnum.weakCatalog:
      return weakCatalogTemplate(args);
    default:
      throw new Error(
        "operationsIndexDictionary case not handled. This should not happen."
      );
  }
};

const businessOnlyTemplate: DictionaryFn = (args) => `
export * from "./exists";
export * from "./find";
export * from "./findAll";
export * from "./findMany";
export * from "./insert";
export * from "./update";
`;

const fullTemplate: DictionaryFn = (args) => `
export * from "./deleteHard";
export * from "./deleteManyHard";
export * from "./deleteManyShy";
export * from "./deleteManySoft";
export * from "./deleteShy";
export * from "./deleteSoft";
export * from "./exists";
export * from "./find";
export * from "./findAll";
export * from "./findMany";
export * from "./insert";
export * from "./insertMany";
export * from "./purge";
export * from "./search";
export * from "./truncate";
export * from "./update";
export * from "./updateMany";
`;

const metadataTemplate: DictionaryFn = (args) => `
export * from "./find";
export * from "./findMany";
export * from "./insert";
export * from "./purge";
export * from "./truncate";
`;

const simpleTemplate: DictionaryFn = (args) => `
export * from "./exists";
export * from "./find";
export * from "./findMany";
export * from "./insert";
export * from "./insertMany";
export * from "./purge";
export * from "./truncate";
export * from "./update";
export * from "./updateMany";
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
export * from "./findAll";
export * from "./insertMany";
export * from "./truncate";
`;
