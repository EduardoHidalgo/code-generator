import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const insertDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.businessOnly:
    case GenerationTypeEnum.full:
    case GenerationTypeEnum.simple:
      return generalTemplate(args);
    case GenerationTypeEnum.metadata:
      return metadataTemplate(args);
    case GenerationTypeEnum.weakCatalog:
    default:
      throw new Error(
        "insertDictionary case not handled. This should not happen."
      );
  }
};

const metadataTemplate: DictionaryFn = (args) => ``;

const generalTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";

import { 
    ${args.subdomain}Error, 
    ${args.subdomain}Model, 
    ${args.subdomain}Repo 
} from "@/${args.version}/${args.camel.domain}";

export namespace Insert {
    export interface Args extends Omit<${args.subdomain}Repo.InsertArgs, "dao"> {
        request: ${args.subdomain}Model.Request.Create;
        language: string;
        responsibleId: number;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.insert(args);
        }
    
        private async insert(args: Args): Promise<
        ${args.subdomain}Model.DTO.Insert | BaseError
        >  {
            try {
                const { language, request, responsibleId } = args;

                /** @todo: Please improve this implementation. */

                const dao = this.buildEntity(request);

                return await this.repo.insert({
                  dao
                });
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledInsertError(error);
            }
        }

        private buildEntity(
            request: ${args.subdomain}Model.Request.Create
        ): ${args.subdomain}Model.DAO.Create {
            return {
                ...request,
                /** @todo: Maybe you will want to improve this modelling. */
            }
        }
    }
}
`;
