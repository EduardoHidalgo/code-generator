import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const findManyDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.businessOnly:
      return businessOnlyTemplate(args);
    case GenerationTypeEnum.full:
      return fullTemplate(args);
    case GenerationTypeEnum.metadata:
      return metadataTemplate(args);
    case GenerationTypeEnum.simple:
      return generalTemplate(args);
    case GenerationTypeEnum.weakCatalog:
    default:
      throw new Error(
        "findManyDictionary case not handled. This should not happen."
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

export namespace FindMany {
    export interface Args extends ${args.subdomain}Repo.FindManyArgs {
        language: string;
        responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.deleteHard(args);
        }
    
        private async deleteHard(args: Args): Promise<
        ${args.subdomain}Model.DTO.FindMany | BaseError
        >  {
            try {
                const {} = args;

                /** @todo: Please improve this implementation. */

                return await this.repo.findMany({});
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledFindManyError(error);
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

export namespace FindMany {
    export interface Args extends ${args.subdomain}Repo.FindManyArgs {
        language: string;
        responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.deleteHard(args);
        }
    
        private async deleteHard(args: Args): Promise<
        ${args.subdomain}Model.DTO.FindMany | BaseError
        >  {
            try {
                const { language, responseType } = args;
        
                const result = await this.repo.findMany({});
        
                if (result instanceof BaseError) return result;

                return this.toResponse({
                    result, responseType
                });
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledFindManyError(error);
            }
        }
        
        private toResponse(args: {
            result: ${args.subdomain}Model.DTO.FindManyBase,
            responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported
        }): ${args.subdomain}Model.DTO.FindMany {
            const { result, responseType } = args;

            switch (responseType) {
                case ResponseTypeEnum.aggregate:
                  return result.map((r) =>
                    ${args.subdomain}Mapper.Domain.rootToAggregate(r)
                  );
                case ResponseTypeEnum.partial:
                  return result.map((r) =>
                    ${args.subdomain}Mapper.Domain.rootToPartial(r)
                  );
                default:
                  return result;
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
    ${args.subdomain}Model, 
    ${args.subdomain}Repo 
} from "@/${args.version}/${args.camel.domain}";

export namespace FindMany {
    export interface Args extends ${args.subdomain}Repo.FindManyArgs {
        language: string;
        responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.deleteHard(args);
        }
    
        private async deleteHard(args: Args): Promise<
        ${args.subdomain}Model.DTO.FindMany | BaseError
        >  {
            try {
                const {} = args;

                /** @todo: Please improve this implementation. */

                return await this.repo.findMany({});
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledFindManyError(error);
            }
        }
    }
}
`;
