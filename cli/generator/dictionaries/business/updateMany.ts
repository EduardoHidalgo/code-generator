import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const updateManyDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.full:
    case GenerationTypeEnum.simple:
      return generalTemplate(args);
    case GenerationTypeEnum.businessOnly:
    case GenerationTypeEnum.metadata:
    case GenerationTypeEnum.weakCatalog:
    default:
      throw new Error(
        "updateManyDictionary case not handled. This should not happen."
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

export namespace UpdateMany {
    export interface Args extends Omit<${args.subdomain}Repo.UpdateManyArgs, "dao"> {
        request: ${args.subdomain}Model.Request.UpdateMany;
        responsibleId: number;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.updateMany(args);
        }
    
        private async updateMany(args: Args): Promise<
        ${args.subdomain}Model.DTO.UpdateMany | BaseError
        >  {
            try {
                const { request } = args;

                /** @todo: Please improve this implementation. */

                const dao = this.buildDAO(args);

                const result = await this.repo.updateMany({
                    dao
                });

                if (result instanceof BaseError) return result;

                return undefined as void;
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledUpdateManyError(error);
            }
        }

        private buildDAO(args: Args): ${args.subdomain}Model.DAO.UpdateMany {
            const { request } = args;

            return request.map(r => {
                return {
                    ...r
                }
            });
        }
    }
}
`;
