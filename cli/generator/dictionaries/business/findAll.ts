import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const findAllDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.full:
      return fullTemplate(args);
    case GenerationTypeEnum.businessOnly:
    case GenerationTypeEnum.simple:
    case GenerationTypeEnum.weakCatalog:
      return generalTemplate(args);
    case GenerationTypeEnum.metadata:
    default:
      throw new Error(
        "findAllDictionary case not handled. This should not happen."
      );
  }
};

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

export namespace FindAll {
    export interface Args extends ${args.subdomain}Repo.FindAllArgs {
        language: string;
        responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.findAll(args);
        }
    
        private async findAll(args: Args): Promise<
        ${args.subdomain}Model.DTO.FindAll | BaseError
        >  {
            try {
                const { language, responseType } = args;

                /** @todo: Please improve this implementation. */

                const result = await this.repo.findAll({});

                if (result instanceof BaseError) return result;

                return this.toResponse({
                    result, responseType
                });
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledFindAllError(error);
            }
        }

        private toResponse(args: {
            result: ${args.subdomain}Model.DTO.FindAllBase,
            responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported
        }): ${args.subdomain}Model.DTO.FindAll {
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

const generalTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";

import {
    ${args.subdomain}Error, 
    ${args.subdomain}Model, 
    ${args.subdomain}Repo 
} from "@/${args.version}/${args.camel.domain}";

export namespace FindAll {
    export interface Args extends ${args.subdomain}Repo.FindAllArgs {}
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.findAll(args);
        }
    
        async findAll(args: Args): Promise<
        ${args.subdomain}Model.DTO.FindAll | BaseError
        >  {
            try {
                const {} = args;

                /** @todo: Please improve this implementation. */

                return await this.repo.findAll({});
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledFindAllError(error);
            }
        }
    }
}
`;
