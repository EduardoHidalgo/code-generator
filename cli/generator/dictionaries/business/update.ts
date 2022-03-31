import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const updateDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.businessOnly:
    case GenerationTypeEnum.full:
    case GenerationTypeEnum.simple:
      return generalTemplate(args);
    case GenerationTypeEnum.metadata:
    case GenerationTypeEnum.weakCatalog:
    default:
      throw new Error(
        "updateDictionary case not handled. This should not happen."
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

export namespace Update {
    export interface Args extends Omit<${args.subdomain}Repo.UpdateArgs, "dao"> {
        request: ${args.subdomain}Model.Request.Update;
        responsibleId: number;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.update(args);
        }
    
        private async update(args: Args): Promise<
        ${args.subdomain}Model.DTO.Update | BaseError
        >  {
            try {
                const { ${args.camel.subdomain}Id, request } = args;

                /** @todo: Please improve this implementation. */

                return await this.repo.update({
                    ${args.camel.subdomain}Id,
                    dao: request,
                  });
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledUpdateError(error);
            }
        }
    }
}
`;
