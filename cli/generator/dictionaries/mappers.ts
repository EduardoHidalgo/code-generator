import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const mappersDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.full:
      return fullTemplate(args);
    case GenerationTypeEnum.simple:
      return simpleTemplate(args);
    case GenerationTypeEnum.weakCatalog:
      return weakCatalogTemplate(args);
    case GenerationTypeEnum.businessOnly:
    case GenerationTypeEnum.metadata:
    default:
      throw new Error(
        "mappersDictionary case not handled. This should not happen."
      );
  }
};

const fullTemplate: DictionaryFn = (args) => `
import { 
    ${args.subdomain}ApiInterface, 
    ${args.subdomain}Model 
} from "@/${args.version}/${args.camel.domain}";


export namespace ${args.subdomain}Mapper {
    export class Domain {
        static rootToAggregate(
            domain: ${args.subdomain}Model.Domain.Root
        ): ${args.subdomain}Model.Domain.Root {
            /** @todo: You should improve this mapper implementation. */
            return domain;
        }

        static rootToPartial(
            domain: ${args.subdomain}Model.Domain.Root
        ): ${args.subdomain}Model.Domain.Root {
            /** @todo: You should improve this mapper implementation. */
            return domain;
        }

        static baseToRoot(
            dar: ${args.subdomain}Model.Domain.Base
        ): ${args.subdomain}Model.Domain.Root {
            /** @todo: You should improve this mapper implementation. */
            return dar;
        }
    }

    export class Request {
        static toFilterDAO(
            query: ${args.subdomain}ApiInterface.GetMany.Query
        ): ${args.subdomain}Model.DAO.Filter {
            /** @todo: You should improve this mapper implementation. */
            return {}
        }
    }
}
`;

const simpleTemplate: DictionaryFn = (args) => `
import { 
    ${args.subdomain}Model 
} from "@/${args.version}/${args.camel.domain}";


export namespace ${args.subdomain}Mapper {
    export class Domain {
        static rootToAggregate(
            domain: ${args.subdomain}Model.Domain.Root
        ): ${args.subdomain}Model.Domain.Root {
            /** @todo: You should improve this mapper implementation. */
            return domain;
        }

        static rootToPartial(
            domain: ${args.subdomain}Model.Domain.Root
        ): ${args.subdomain}Model.Domain.Root {
            /** @todo: You should improve this mapper implementation. */
            return domain;
        }

        static baseToRoot(
            dar: ${args.subdomain}Model.Domain.Base
        ): ${args.subdomain}Model.Domain.Root {
            /** @todo: You should improve this mapper implementation. */
            return dar;
        }
    }

    export class Request {}
}
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
export namespace ${args.subdomain}Mapper {
    export class Domain {}

    export class Request {}
}
`;
