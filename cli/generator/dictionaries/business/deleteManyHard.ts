import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const deleteManyHardDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.full:
      return generalTemplate(args);
    case GenerationTypeEnum.businessOnly:
    case GenerationTypeEnum.metadata:
    case GenerationTypeEnum.simple:
    case GenerationTypeEnum.weakCatalog:
    default:
      throw new Error(
        "deleteManyHardDictionary case not handled. This should not happen."
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

export namespace DeleteManyHard {
    export interface Args extends ${args.subdomain}Repo.DeleteManyArgs {
        responsibleId: number;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.deleteManyHard(args);
        }
    
        private async deleteManyHard(args: Args): Promise<
        ${args.subdomain}Model.DTO.DeleteManyHard | BaseError
        >  {
            try {
                /** @todo: Please improve this implementation. */
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledDeleteManyHardError(error);
            }
        }
    }
}
`;
