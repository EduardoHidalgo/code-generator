import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const existsDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.businessOnly:
      return generalTemplate(args);
    case GenerationTypeEnum.full:
      return generalTemplate(args);
    case GenerationTypeEnum.simple:
      return generalTemplate(args);
    case GenerationTypeEnum.metadata:
    case GenerationTypeEnum.weakCatalog:
    default:
      throw new Error(
        "existsDictionary case not handled. This should not happen."
      );
  }
};

const generalTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";

import { 
    ${args.subdomain}Error, 
    ${args.subdomain}Model, 
    ${args.subdomain}Repo 
} from "@/${args.version}/${args.camel.domain}";

export namespace Exists {
    export interface Args extends ${args.subdomain}Repo.ExistsArgs {}

    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.exists(args);
        }
    
        private async exists(args: Args): Promise<
        ${args.subdomain}Model.DTO.Exists | BaseError
        >  {
            try {
                const { ${args.camel.subdomain}Id } = args;

                /** @todo: Please improve this implementation. */

                return await this.repo.exists({
                    ${args.camel.subdomain}Id,
                });
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledExistsError(error);
            }
        }
    }
}
`;
