import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const purgeDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.full:
    case GenerationTypeEnum.metadata:
    case GenerationTypeEnum.simple:
      return generalTemplate(args);
    case GenerationTypeEnum.businessOnly:
    case GenerationTypeEnum.weakCatalog:
    default:
      throw new Error(
        "purgeDictionary case not handled. This should not happen."
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

export namespace Purge {
    export interface Args {}

    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.purge(args);
        }
    
        private async purge(args: Args): Promise<
        ${args.subdomain}Model.DTO.Purge | BaseError
        >  {
            try {
                const {} = args;

                /** @todo: Please improve this implementation. */

                const result = await this.repo.deleteMany({});

                if (result instanceof BaseError) return result;

                return undefined as void;
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledPurgeError(error);
            }
        }
    }
}
`;
