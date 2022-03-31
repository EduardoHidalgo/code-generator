import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const findDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.businessOnly:
      return businessOnlyTemplate(args);
    case GenerationTypeEnum.full:
      return fullTemplate(args);
    case GenerationTypeEnum.metadata:
      return metadataTemplate(args);
    case GenerationTypeEnum.simple:
    case GenerationTypeEnum.weakCatalog:
      return generalTemplate(args);
    default:
      throw new Error(
        "findDictionary case not handled. This should not happen."
      );
  }
};

const businessOnlyTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";

import { 
    ${args.subdomain}Error,
    ${args.subdomain}Model, 
    ${args.subdomain}Repo 
} from "@/${args.version}/${args.camel.domain}";

export namespace Find {
    export interface Args extends ${args.subdomain}Repo.FindArgs {
        language: string;
        responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.find(args);
        }
    
        private async find(args: Args): Promise<
        ${args.subdomain}Model.DTO.Find | BaseError
        >  {
            try {
                const { ${args.camel.subdomain}Id } = args;

                /** @todo: Please improve this implementation. */

                return await this.repo.find({
                    ${args.camel.subdomain}Id
                });
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledFindError(error);
            }
        }
    }
}
`;

const fullTemplate: DictionaryFn = (args) => `
import { ResponseTypeEnum } from "@/core/app/response";
import { BaseError } from "@/core/errors/baseError";

import { 
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Error,
    ${args.subdomain}Mapper,
    ${args.subdomain}Model, 
    ${args.subdomain}Repo 
} from "@/${args.version}/${args.camel.domain}";

export namespace Find {
    export interface Args extends ${args.subdomain}Repo.FindArgs {
        language: string;
        responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.find(args);
        }
    
        private async find(args: Args): Promise<
        ${args.subdomain}Model.DTO.Find | BaseError
        >  {
            try {
                const { ${args.camel.subdomain}Id, responseType } = args;

                /** @todo: Please improve this implementation. */

                const result = await this.repo.find({
                    ${args.camel.subdomain}Id
                });
        
                if (result instanceof BaseError) return result;
        
                switch (responseType) {
                    case ResponseTypeEnum.aggregate:
                        return ${args.subdomain}Mapper.Domain.rootToAggregate(result);
                    case ResponseTypeEnum.partial:
                        return ${args.subdomain}Mapper.Domain.rootToPartial(result);
                    default:
                        return result;
                }
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledFindError(error);
            }
        }
    }
}
`;

const metadataTemplate: DictionaryFn = (args) => ``;

const generalTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";

import { 
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Error,
    ${args.subdomain}Mapper,
    ${args.subdomain}Model, 
    ${args.subdomain}Repo 
} from "@/${args.version}/${args.camel.domain}";

export namespace Find {
    export interface Args extends ${args.subdomain}Repo.FindArgs {
        language: string;
        responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.find(args);
        }
    
        private async find(args: Args): Promise<
        ${args.subdomain}Model.DTO.Find | BaseError
        >  {
            try {
                const { ${args.camel.subdomain}Id } = args;

                /** @todo: Please improve this implementation. */

                return await this.repo.find({
                    ${args.camel.subdomain}Id
                });
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledFindError(error);
            }
        }
    }
}
`;
