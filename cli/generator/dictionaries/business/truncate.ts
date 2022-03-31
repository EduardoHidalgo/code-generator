import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const truncateDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.full:
    case GenerationTypeEnum.metadata:
    case GenerationTypeEnum.simple:
    case GenerationTypeEnum.weakCatalog:
      return generalTemplate(args);
    case GenerationTypeEnum.businessOnly:
    default:
      throw new Error(
        "truncateDictionary case not handled. This should not happen."
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

export namespace Truncate {
    export interface Args extends ${args.subdomain}Repo.TruncateArgs {}

    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.truncate(args);
        }
    
        private async truncate(args: Args): Promise<
        ${args.subdomain}Model.DTO.Truncate | BaseError
        >  {
            try {
                const {} = args;

                /** @todo: Please improve this implementation. */

                const result = await this.repo.truncate({});

                if (result instanceof BaseError) return result;

                return undefined as void;
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledTruncateError(error);
            }
        }
    }
}
`;
