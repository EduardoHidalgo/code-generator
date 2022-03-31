import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const insertManyDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.full:
    case GenerationTypeEnum.simple:
      return generalTemplate(args);
    case GenerationTypeEnum.weakCatalog:
      return weakCatalogTemplate(args);
    case GenerationTypeEnum.businessOnly:
    case GenerationTypeEnum.metadata:
    default:
      throw new Error(
        "insertManyDictionary case not handled. This should not happen."
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

export namespace InsertMany {
    export interface Args extends Omit<${args.subdomain}Repo.InsertManyArgs, "dao"> {
        request: ${args.subdomain}Model.Request.CreateMany;
        language: string;
        responsibleId: number;
    }

    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.insertMany(args);
        }
    
        async insertMany(args: Args): Promise<
        ${args.subdomain}Model.DTO.InsertMany | BaseError
        >  {
            try {
                const { language, request, responsibleId } = args;

                /** @todo: Please improve this implementation. */

                const dao = request.map(r => this.buildEntity(r));

                const result = await this.repo.insertMany({
                    dao,
                });

                if (result instanceof BaseError) return result;

                return undefined as void;
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledInsertManyError(error);
            }
        }

        private buildEntity(
            request: ${args.subdomain}Model.Request.CreateManyBase
        ): ${args.subdomain}Model.DAO.Create {
            return {
                ...request,
                /** @todo: Maybe you will want to improve this modelling. */
            }
        }
    }
}
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";

import { 
    ${args.subdomain}Error, 
    ${args.subdomain}Model, 
    ${args.subdomain}Repo 
} from "@/${args.version}/${args.camel.domain}";

export namespace InsertMany {
    export interface Args extends Omit<${args.subdomain}Repo.InsertManyArgs, "dao"> {
        request: ${args.subdomain}Model.Request.CreateMany;
    }

    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.insertMany(args);
        }
    
        async insertMany(args: Args): Promise<
        ${args.subdomain}Model.DTO.InsertMany | BaseError
        >  {
            try {
                const { request } = args;

                /** @todo: Please improve this implementation. */

                const dao = request.map(r => this.buildEntity(r));

                const result = await this.repo.insertMany({
                    dao
                });

                if (result instanceof BaseError) return result;

                return undefined as void;
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledInsertManyError(error);
            }
        }

        private buildEntity(
            request: ${args.subdomain}Model.Request.CreateManyBase
        ): ${args.subdomain}Model.DAO.Create {
            return {
                ...request,
                /** @todo: Maybe you will want to improve this modelling. */
            }
        }
    }
}
`;
