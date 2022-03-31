import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const groupIndexDictionary: DictionaryFn = (args) => {
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
        "groupIndexDictionary case not handled. This should not happen."
      );
  }
};

const businessOnlyTemplate: DictionaryFn = (args) => `
/** @todo: this index should be merged manually with index.ts. */

export * as ${args.subdomain}BusinessOps from "./domain/business/${args.camel.subdomain}/index";
export * from "./domain/business/${args.camel.subdomain}";
export * from "./domain/errors/${args.camel.subdomain}";
export * from "./domain/models/${args.camel.subdomain}";
export * from "./infra/dataAccess/${args.camel.subdomain}";
export * from "./infra/repos/${args.camel.subdomain}";
`;

const fullTemplate: DictionaryFn = (args) => `
/** @todo: this index should be merged manually with index.ts. */

export * from "./api/${args.camel.subdomain}/interface";
export * from "./api/${args.camel.subdomain}/routes";
export * from "./api/${args.camel.subdomain}/schema";

export * as ${args.subdomain}BusinessOps from "./domain/business/${args.camel.subdomain}/index";
export * from "./domain/business/${args.camel.subdomain}";
export * from "./domain/errors/${args.camel.subdomain}";
export * from "./domain/mappers/${args.camel.subdomain}";
export * from "./domain/models/${args.camel.subdomain}";
export * from "./infra/dataAccess/${args.camel.subdomain}";
export * from "./infra/modules/${args.camel.subdomain}";
export * from "./infra/repos/${args.camel.subdomain}";
`;

const metadataTemplate: DictionaryFn = (args) => `
/** @todo: this index should be merged manually with index.ts. */

export * from "./api/${args.camel.subdomain}/interface";
export * from "./api/${args.camel.subdomain}/routes";
export * from "./api/${args.camel.subdomain}/schema";

export * as ${args.subdomain}BusinessOps from "./domain/business/${args.camel.subdomain}/index";
export * from "./domain/business/${args.camel.subdomain}";
export * from "./domain/errors/${args.camel.subdomain}";
export * from "./domain/models/${args.camel.subdomain}";
export * from "./infra/dataAccess/${args.camel.subdomain}";
export * from "./infra/modules/${args.camel.subdomain}";
export * from "./infra/repos/${args.camel.subdomain}";
`;

const simpleTemplate: DictionaryFn = (args) => `
/** @todo: this index should be merged manually with index.ts. */

export * from "./api/${args.camel.subdomain}/interface";
export * from "./api/${args.camel.subdomain}/routes";
export * from "./api/${args.camel.subdomain}/schema";

export * as ${args.subdomain}BusinessOps from "./domain/business/${args.camel.subdomain}/index";
export * from "./domain/business/${args.camel.subdomain}";
export * from "./domain/errors/${args.camel.subdomain}";
export * from "./domain/mappers/${args.camel.subdomain}";
export * from "./domain/models/${args.camel.subdomain}";
export * from "./infra/dataAccess/${args.camel.subdomain}";
export * from "./infra/modules/${args.camel.subdomain}";
export * from "./infra/repos/${args.camel.subdomain}";
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
/** @todo: this index should be merged manually with index.ts. */

export * from "./api/${args.camel.subdomain}/interface";
export * from "./api/${args.camel.subdomain}/routes";
export * from "./api/${args.camel.subdomain}/schema";

export * as ${args.subdomain}BusinessOps from "./domain/business/${args.camel.subdomain}/index";
export * from "./domain/business/${args.camel.subdomain}";
export * from "./domain/errors/${args.camel.subdomain}";
export * from "./domain/mappers/${args.camel.subdomain}";
export * from "./domain/models/${args.camel.subdomain}";
export * from "./infra/dataAccess/${args.camel.subdomain}";
export * from "./infra/modules/${args.camel.subdomain}";
export * from "./infra/repos/${args.camel.subdomain}";
`;
