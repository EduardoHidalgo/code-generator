import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const searchDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.full:
      return fullTemplate(args);
    case GenerationTypeEnum.businessOnly:
    case GenerationTypeEnum.metadata:
    case GenerationTypeEnum.simple:
    case GenerationTypeEnum.weakCatalog:
    default:
      throw new Error(
        "searchDictionary case not handled. This should not happen."
      );
  }
};

const fullTemplate: DictionaryFn = (args) => `
import { ResponseTypeEnum } from "@/core/app/response";
import { BaseError } from "@/core/errors/baseError";
import { PaginationRequest } from "@/libs/pagination/models";

import {
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Error,
    ${args.subdomain}Mapper,
    ${args.subdomain}Model, 
    ${args.subdomain}Repo 
} from "@/${args.version}/${args.camel.domain}";

export namespace Search {
    export interface Args extends Pick<${args.subdomain}Repo.SearchArgs, "args"> {
        filter: ${args.subdomain}Model.DAO.Filter;
        language: string;
        pagination: PaginationRequest;
        responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported;
    }
    
    export class Op {
        private repo: ${args.subdomain}Repo.Repo;
    
        constructor() {
            this.repo = new ${args.subdomain}Repo.Repo();
        }
    
        async execute(args: Args) {
            return await this.search(args);
        }
    
        private async search(_args: Args): Promise<
        ${args.subdomain}Model.DTO.Search | BaseError
        >  {
            try {
                const { args, filter, language, pagination, responseType } = _args;
                
                /** @todo: Please improve this implementation. */
            
                const result = await this.repo.search({
                    args,
                    filter,
                    pagination
                });

                if (result instanceof BaseError) return result;

                return this.toResponse({
                    result, responseType
                });
            } catch (error) {
                return new ${args.subdomain}Error.UnhandledSearchError(error);
            }
        }

        private toResponse(args: {
            result: ${args.subdomain}Model.DTO.SearchBase,
            responseType?: ${args.subdomain}ApiInterface.GetMany.ResponseTypeSupported;
        }): ${args.subdomain}Model.DTO.Search {
            const { result, responseType } = args;
            const list = result.data;

            switch(responseType) {
                case ResponseTypeEnum.aggregate:
                    return {...result, data: list.map(e => ${args.subdomain}Mapper.Domain.rootToAggregate(e))};
                case ResponseTypeEnum.partial:
                    return {...result, data: list.map(e => ${args.subdomain}Mapper.Domain.rootToPartial(e))};
                case ResponseTypeEnum.standard:
                default:
                    return {...result, data: list.map(e => ${args.subdomain}Mapper.Domain.baseToRoot(e))};
            }
        }

        
    }
}
`;
