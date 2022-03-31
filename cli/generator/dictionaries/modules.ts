import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const modulesDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.full:
      return fullTemplate(args);
    case GenerationTypeEnum.metadata:
      return metadataTemplate(args);
    case GenerationTypeEnum.simple:
      return simpleTemplate(args);
    case GenerationTypeEnum.weakCatalog:
      return weakCatalogTemplate(args);
    case GenerationTypeEnum.businessOnly:
    default:
      throw new Error(
        "modulesDictionary case not handled. This should not happen."
      );
  }
};

const fullTemplate: DictionaryFn = (args) => `
import { BaseError, SuccessCode } from "@/core/errors/baseError";
import { ModuleError } from "@/core/errors/moduleError";
import { DeletionTypeEnum } from "@/core/app/deletion";
import { SearchTypeEnum } from "@/core/app/search";
import { EitherPromise } from "@/core/infra/either";
import { Result } from "@/core/infra/result";
import { PaginationMapper } from "@/libs/pagination/models";

import {
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Business,
    ${args.subdomain}Mapper,
    ${args.subdomain}Model,
  } from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Module {
    async create(
        req: ${args.subdomain}ApiInterface.Create.Request
    ): EitherPromise<${args.subdomain}Model.Response.Create, BaseError> {
        try {
            const request = req.body;
            const language = String(req.headers["language"]);
            const responsibleId = Number(req.headers["responsible-id"]);

            const business = new ${args.subdomain}Business();

            const result = await business.insert({
                request,
                language,
                responsibleId,
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.CREATED,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async createMany(
        req: ${args.subdomain}ApiInterface.CreateMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.CreateMany, BaseError> {
        try {
            const request = req.body;
            const language = String(req.headers["language"]);
            const responsibleId = Number(req.headers["responsible-id"]);

            const business = new ${args.subdomain}Business();

            const result = await business.insertMany({
                request,
                language,
                responsibleId,
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.CREATED,
                value: undefined as void,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async delete(
        req: ${args.subdomain}ApiInterface.Delete.Request
    ): EitherPromise<${args.subdomain}Model.Response.Delete, BaseError> {
        try {
            const responsibleId = Number(req.headers["responsible-id"]);
            const deletionType = req.query.deletionType;
            const ${args.camel.subdomain}Id = Number(req.params.${args.camel.subdomain}Id);

            const business = new ${args.subdomain}Business();
            let result: 
                | ${args.subdomain}Model.DTO.DeleteShy 
                | ${args.subdomain}Model.DTO.DeleteSoft 
                | ${args.subdomain}Model.DTO.DeleteHard 
                | BaseError;

            switch (deletionType) {
                case DeletionTypeEnum.hard:
                    result = await business.deleteHard({
                        ${args.camel.subdomain}Id,
                        responsibleId
                    });
                    break;
                case DeletionTypeEnum.soft:
                    result = await business.deleteSoft({
                        ${args.camel.subdomain}Id,
                        responsibleId
                    });
                    break;
                case DeletionTypeEnum.shy:
                default:
                    result = await business.deleteShy({
                        ${args.camel.subdomain}Id,
                        responsibleId
                    });
                    break;
            }

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async deleteMany(
        req: ${args.subdomain}ApiInterface.DeleteMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.DeleteMany, BaseError> {
        try {
            const responsibleId = Number(req.headers["responsible-id"]);
            const deletionType = req.query.deletionType;

            const business = new ${args.subdomain}Business();
            let result: 
                | ${args.subdomain}Model.DTO.DeleteHard
                | ${args.subdomain}Model.DTO.DeleteShy
                | ${args.subdomain}Model.DTO.DeleteSoft
                | ${args.subdomain}Model.DTO.Purge 
                | ${args.subdomain}Model.DTO.Truncate 
                | BaseError;

            switch (deletionType) {
                case DeletionTypeEnum.hard:
                    result = await business.deleteManyHard({
                        responsibleId
                    });
                    break;
                case DeletionTypeEnum.soft:
                    result = await business.deleteManyShy({
                        responsibleId
                    });
                    break;
                case DeletionTypeEnum.purge:
                    result = await business.purge({});
                    break;
                case DeletionTypeEnum.truncate:
                    result = await business.truncate({});
                    break;
                case DeletionTypeEnum.shy:
                default:
                    result = await business.deleteManySoft({
                        responsibleId
                    });
                    break;
            }

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode["NO-CONTENT"],
                value: undefined as void,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async get(
        req: ${args.subdomain}ApiInterface.Get.Request
    ): EitherPromise<${args.subdomain}Model.Response.Get, BaseError> {
        try {
            const language = String(req.headers["language"]);
            const responseType = req.query.responseType;
            const ${args.camel.subdomain}Id = Number(req.params.${args.camel.subdomain}Id);


            const business = new ${args.subdomain}Business();

            const result = await business.find({
                ${args.camel.subdomain}Id,
                language,
                responseType
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async getMany(
        req: ${args.subdomain}ApiInterface.GetMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.GetMany, BaseError> {
        try {
            const language = String(req.headers["language"]);
            const responseType = req.query.responseType;
            const searchType = req.query.searchType;

            const business = new ${args.subdomain}Business();
            let result: 
            | ${args.subdomain}Model.DTO.FindAll
            | ${args.subdomain}Model.DTO.FindMany
            | ${args.subdomain}Model.DTO.Search
            | BaseError;

            switch (searchType) {
                case SearchTypeEnum.all:
                    result = await business.findAll({
                        language,
                        responseType
                    });
                    break;
                case SearchTypeEnum.search:
                    const filter = ${args.subdomain}Mapper.Request.toFilterDAO(req.query);
                    const pagination = PaginationMapper.Request.rehydrate(req.query);

                    result = await business.search({
                        args: {},
                        filter,
                        language,
                        pagination,
                        responseType
                    });
                    break;
                case SearchTypeEnum.related:
                default:
                    result = await business.findMany({
                        language,
                        responseType
                    });
                    break;
            }

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async update(
        req: ${args.subdomain}ApiInterface.Update.Request
    ): EitherPromise<${args.subdomain}Model.Response.Update, BaseError> {
        try {
            const request = req.body;
            const ${args.camel.subdomain}Id = Number(req.params.${args.camel.subdomain}Id);
            const responsibleId = Number(req.headers["responsible-id"]);

            const business = new ${args.subdomain}Business();

            const result = await business.update({
                ${args.camel.subdomain}Id,
                request,
                responsibleId,
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async updateMany(
        req: ${args.subdomain}ApiInterface.UpdateMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.UpdateMany, BaseError> {
        try {
            const request = req.body;
            const responsibleId = Number(req.headers["responsible-id"]);

            const business = new ${args.subdomain}Business();

            const result = await business.updateMany({
                request,
                responsibleId,
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }
} 
`;

const metadataTemplate: DictionaryFn = (args) => `
import { BaseError, SuccessCode } from "@/core/errors/baseError";
import { ModuleError } from "@/core/errors/moduleError";
import { DeletionTypeEnum } from "@/core/app/deletion";
import { EitherPromise } from "@/core/infra/either";
import { Result } from "@/core/infra/result";

import {
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Business,
    ${args.subdomain}Model,
  } from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Module {
    async create(
        req: ${args.subdomain}ApiInterface.Create.Request
    ): EitherPromise<${args.subdomain}Model.Response.Create, BaseError> {
        try {
            const request = req.body;
            const responsibleId = Number(req.headers["responsible-id"]);

            const business = new ${args.subdomain}Business();

            const result = await business.insert({
                request,
                responsibleId,
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.CREATED,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async deleteMany(
        req: ${args.subdomain}ApiInterface.DeleteMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.DeleteMany, BaseError> {
        try {
            const responsibleId = Number(req.headers["responsible-id"]);
            const deletionType = req.query.deletionType;

            const business = new ${args.subdomain}Business();
            let result: 
                | ${args.subdomain}Model.DTO.Purge 
                | ${args.subdomain}Model.DTO.Truncate 
                | BaseError;

            switch (deletionType) {
                case DeletionTypeEnum.truncate:
                    result = await business.truncate({});
                    break;
                case DeletionTypeEnum.purge:
                default:
                    result = await business.purge({});
                    break;
            }

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode["NO-CONTENT"],
                value: undefined as void,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async get(
        req: ${args.subdomain}ApiInterface.Get.Request
    ): EitherPromise<${args.subdomain}Model.Response.Get, BaseError> {
        try {
            const ${args.camel.subdomain}Id = Number(req.params.${args.camel.subdomain}Id);

            const business = new ${args.subdomain}Business();

            const result = await business.find({
                ${args.camel.subdomain}Id
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async getMany(
        req: ${args.subdomain}ApiInterface.GetMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.GetMany, BaseError> {
        try {
            const responseType = req.query.responseType;
            const ${args.camel.metadataRelationId} = Number(req.params.${args.camel.metadataRelationId});

            const business = new ${args.subdomain}Business();

            result = await business.findMany({
                ${args.camel.metadataRelationId}
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }
} 
`;

const simpleTemplate: DictionaryFn = (args) => `
import { BaseError, SuccessCode } from "@/core/errors/baseError";
import { ModuleError } from "@/core/errors/moduleError";
import { DeletionTypeEnum } from "@/core/app/deletion";
import { EitherPromise } from "@/core/infra/either";
import { Result } from "@/core/infra/result";

import {
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Business,
    ${args.subdomain}Model,
  } from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Module {
    async create(
        req: ${args.subdomain}ApiInterface.Create.Request
    ): EitherPromise<${args.subdomain}Model.Response.Create, BaseError> {
        try {
            const request = req.body;
            const language = String(req.headers["language"]);
            const responsibleId = Number(req.headers["responsible-id"]);

            const business = new ${args.subdomain}Business();

            const result = await business.insert({
                request,
                language,
                responsibleId,
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.CREATED,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async createMany(
        req: ${args.subdomain}ApiInterface.CreateMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.CreateMany, BaseError> {
        try {
            const request = req.body;
            const language = String(req.headers["language"]);
            const responsibleId = Number(req.headers["responsible-id"]);

            const business = new ${args.subdomain}Business();

            const result = await business.insertMany({
                request,
                language,
                responsibleId,
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.CREATED,
                value: undefined as void,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async deleteMany(
        req: ${args.subdomain}ApiInterface.DeleteMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.DeleteMany, BaseError> {
        try {
            const deletionType = req.query.deletionType;

            const business = new ${args.subdomain}Business();
            let result: 
                | ${args.subdomain}Model.DTO.Purge 
                | ${args.subdomain}Model.DTO.Truncate 
                | BaseError;

            switch (deletionType) {
                case DeletionTypeEnum.purge:
                    result = await business.purge({});
                    break;
                case DeletionTypeEnum.truncate:
                default:
                    result = await business.truncate({});
                    break;
            }

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode["NO-CONTENT"],
                value: undefined as void,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async get(
        req: ${args.subdomain}ApiInterface.Get.Request
    ): EitherPromise<${args.subdomain}Model.Response.Get, BaseError> {
        try {
            const language = String(req.headers["language"]);
            const responseType = req.query.responseType;
            const ${args.camel.subdomain}Id = Number(req.params.${args.camel.subdomain}Id);


            const business = new ${args.subdomain}Business();

            const result = await business.find({
                ${args.camel.subdomain}Id,
                language,
                responseType
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async getMany(
        req: ${args.subdomain}ApiInterface.GetMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.GetMany, BaseError> {
        try {
            const language = String(req.headers["language"]);
            const responseType = req.query.responseType;

            const business = new ${args.subdomain}Business();

            const result = await business.findMany({
                language,
                responseType
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async update(
        req: ${args.subdomain}ApiInterface.Update.Request
    ): EitherPromise<${args.subdomain}Model.Response.Update, BaseError> {
        try {
            const request = req.body;
            const ${args.camel.subdomain}Id = Number(req.params.${args.camel.subdomain}Id);
            const responsibleId = Number(req.headers["responsible-id"]);

            const business = new ${args.subdomain}Business();

            const result = await business.update({
                ${args.camel.subdomain}Id,
                request,
                responsibleId,
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async updateMany(
        req: ${args.subdomain}ApiInterface.UpdateMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.UpdateMany, BaseError> {
        try {
            const request = req.body;
            const responsibleId = Number(req.headers["responsible-id"]);

            const business = new ${args.subdomain}Business();

            const result = await business.updateMany({
                request,
                responsibleId,
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }
} 
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
import { BaseError, SuccessCode } from "@/core/errors/baseError";
import { ModuleError } from "@/core/errors/moduleError";
import { EitherPromise } from "@/core/infra/either";
import { Result } from "@/core/infra/result";

import {
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Business,
    ${args.subdomain}Model,
  } from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Module {
    async createMany(
        req: ${args.subdomain}ApiInterface.CreateMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.CreateMany, BaseError> {
        try {
            const request = req.body;

            const business = new ${args.subdomain}Business();

            const result = await business.insertMany({
                request,
            });

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.CREATED,
                value: undefined as void,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async deleteMany(
        req: ${args.subdomain}ApiInterface.DeleteMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.DeleteMany, BaseError> {
        try {
            const business = new ${args.subdomain}Business();
            
            const result = await business.truncate({});

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode["NO-CONTENT"],
                value: undefined as void,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }

    async getMany(
        req: ${args.subdomain}ApiInterface.GetMany.Request
    ): EitherPromise<${args.subdomain}Model.Response.GetMany, BaseError> {
        try {

            const business = new ${args.subdomain}Business();

            const result = await business.findAll({});

            if (result instanceof BaseError) {
                return Result.fail({
                    error: result,
                });
            }

            return Result.ok({
                code: SuccessCode.OK,
                value: result,
            });
        } catch (error) {
            return Result.fail({
                error: new ModuleError(error),
            });
        }
    }
} 
`;
