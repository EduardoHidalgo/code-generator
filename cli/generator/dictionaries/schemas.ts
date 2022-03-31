import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const schemasDictionary: DictionaryFn = (args) => {
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
        "schemasDictionary case not handled. This should not happen."
      );
  }
};

const fullTemplate: DictionaryFn = (args) => `
import { NextFunction } from "express";
import Joi from "joi";

import { SchemaError } from "@/core/errors/schemaError";
import { SearchTypeEnum } from "@/core/app/search";
import { paginationDirections } from "@/libs/pagination/models";

import { ${args.subdomain}ApiInterface, ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Schema {
  static create(
    req: ${args.subdomain}ApiInterface.Create.Request,
    res: ${args.subdomain}ApiInterface.Create.Response,
    next: NextFunction
  ) {
    try {
        const body = req.body;
        const headers = req.headers;

        const bodySchema =
            Joi.object<${args.subdomain}ApiInterface.Create.Body>({
                /** @todo Implementation required. */
            });

        const headerSchema =
            Joi.object<${args.subdomain}ApiInterface.Create.Headers>({
                "responsible-id": Joi.number().greater(0).required(),
                language: Joi.string().min(1).required(),
            }).options({ allowUnknown: true });

        const bodyValidation = bodySchema.validate(body);
        const headersValidation = headerSchema.validate(headers);

        if (bodyValidation.error) {
            const error = new SchemaError.BodyException(bodyValidation.error);
            return res.status(error.code).json(error);
        }

        if (headersValidation.error) {
            const error = new SchemaError.HeadersException(headersValidation.error);
            return res.status(error.code).json(error);
        }

        next();
    } catch (e) {
        const error = new SchemaError.SchemaError(e);
        res.status(error.code).json(error);
    }
  }

    static createMany(
        req: ${args.subdomain}ApiInterface.CreateMany.Request,
        res: ${args.subdomain}ApiInterface.CreateMany.Response,
        next: NextFunction
    ) {
        try {
            const body = req.body;
            const headers = req.headers;

            const bodySchema = Joi.array()
                .items(
                    Joi.object<${args.subdomain}Model.Request.CreateManyBase>({
                        /** @todo Implementation required. */
                    })
                )
                .min(1)
                .required();

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.CreateMany.Headers>({
                    "responsible-id": Joi.number().greater(0).required(),
                }).options({ allowUnknown: true });

            const bodyValidation = bodySchema.validate(body);
            const headersValidation = headerSchema.validate(headers);

            if (bodyValidation.error) {
                const error = new SchemaError.BodyException(bodyValidation.error);
                return res.status(error.code).json(error);
            }

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static delete(
        req: ${args.subdomain}ApiInterface.Delete.Request,
        res: ${args.subdomain}ApiInterface.Delete.Response,
        next: NextFunction
    ) {
        try {
            const headers = req.headers;
            const params = req.params;
            const query = req.query;

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.Delete.Headers>({
                    "responsible-id": Joi.number().greater(0).required(),
                }).options({ allowUnknown: true });
            
            const paramsSchema =
                Joi.object<${args.subdomain}ApiInterface.Delete.Params>({
                    ${args.camel.subdomain}Id: Joi.number().greater(0).required(),
                });

            
            const querySchema =
                Joi.object<${args.subdomain}ApiInterface.Delete.Query>({
                    deletionType: Joi.string()
                        .valid(...${args.subdomain}ApiInterface.Delete.deletionTypes)
                        .optional(),
                });

            const headersValidation = headerSchema.validate(headers);
            const paramsValidation = paramsSchema.validate(params);
            const queryValidation = querySchema.validate(query);

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            if (paramsValidation.error) {
                const error = new SchemaError.ParamsException(paramsValidation.error);
                return res.status(error.code).json(error);
            }

            if (queryValidation.error) {
                const error = new SchemaError.QueryException(queryValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static deleteMany(
        req: ${args.subdomain}ApiInterface.DeleteMany.Request,
        res: ${args.subdomain}ApiInterface.DeleteMany.Response,
        next: NextFunction
    ) {
        try {
            const headers = req.headers;
            const query = req.query;

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.DeleteMany.Headers>({
                    "responsible-id": Joi.number().greater(0).required(),
                }).options({ allowUnknown: true });
            
            const querySchema =
                Joi.object<${args.subdomain}ApiInterface.DeleteMany.Query>({
                    deletionType: Joi.string()
                        .valid(...${args.subdomain}ApiInterface.DeleteMany.deletionTypes)
                        .optional(),
                });

            const headersValidation = headerSchema.validate(headers);
            const queryValidation = querySchema.validate(query);

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            if (queryValidation.error) {
                const error = new SchemaError.QueryException(queryValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static get(
        req: ${args.subdomain}ApiInterface.Get.Request,
        res: ${args.subdomain}ApiInterface.Get.Response,
        next: NextFunction
    ) {
        try {
            const headers = req.headers;
            const params = req.params;
            const query = req.query;

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.Get.Headers>({
                    language: Joi.string().min(1).required(),
                }).options({ allowUnknown: true });

            const paramsSchema =
                Joi.object<${args.subdomain}ApiInterface.Get.Params>({
                    ${args.camel.subdomain}Id: Joi.number().greater(0).required(),
                });

            const querySchema =
                Joi.object<${args.subdomain}ApiInterface.Get.Query>({});

            const headersValidation = headerSchema.validate(headers);
            const paramsValidation = paramsSchema.validate(params);
            const queryValidation = querySchema.validate(query);

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            if (paramsValidation.error) {
                const error = new SchemaError.ParamsException(paramsValidation.error);
                return res.status(error.code).json(error);
            }

            if (queryValidation.error) {
                const error = new SchemaError.QueryException(queryValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static getMany(
        req: ${args.subdomain}ApiInterface.GetMany.Request,
        res: ${args.subdomain}ApiInterface.GetMany.Response,
        next: NextFunction
    ) {
        try {
            const headers = req.headers;
            const query = req.query;
            const searchType = req.query.searchType;

            const querySearchSchema =
                Joi.object<${args.subdomain}ApiInterface.GetMany.Query>({
                    searchType: Joi.string()
                        .valid(...${args.subdomain}ApiInterface.GetMany.searchTypes)
                        .optional(),
                });

            const querySearchValidation = querySearchSchema.validate(searchType);

            if (querySearchValidation.error) {
                const error = new SchemaError.QueryException(querySearchValidation.error);
                return res.status(error.code).json(error);
            }

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.GetMany.Headers>({
                    language: Joi.string().min(1).required(),
                }).options({ allowUnknown: true });

            let querySchema: Joi.ObjectSchema<${args.subdomain}ApiInterface.GetMany.Params>;

            switch (searchType) {
                case SearchTypeEnum.all:
                    querySchema =
                        Joi.object<${args.subdomain}ApiInterface.GetMany.Query>({
                            responseType: Joi.string()
                                .valid(...${args.subdomain}ApiInterface.GetMany.responseTypes)
                                .optional(),
                        });
                    break;
                case SearchTypeEnum.search:
                    querySchema =
                        Joi.object<${args.subdomain}ApiInterface.GetMany.Query>({
                            responseType: Joi.string()
                                .valid(...${args.subdomain}ApiInterface.GetMany.responseTypes)
                                .optional(),
                        });
                    break;
                case SearchTypeEnum.related:
                default:
                    querySchema =
                        Joi.object<${args.subdomain}ApiInterface.GetMany.Query>({
                            cursor: Joi.number().greater(0).optional(),
                            direction: Joi.string()
                                .valid(...paginationDirections)
                                .required(),
                            limit: Joi.number().greater(0).required(),
                            offset: Joi.number().greater(0).required(),
                            responseType: Joi.string()
                                .valid(...${args.subdomain}ApiInterface.GetMany.responseTypes)
                                .optional(),
                        });
                    break;
            }

            const headersValidation = headerSchema.validate(headers);
            const queryValidation = querySchema.validate(query);

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            if (queryValidation.error) {
                const error = new SchemaError.QueryException(queryValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static update(
        req: ${args.subdomain}ApiInterface.Update.Request,
        res: ${args.subdomain}ApiInterface.Update.Response,
        next: NextFunction
    ) {
        try {
            const body = req.body;
            const headers = req.headers;
            const params = req.params;

            const bodySchema =
                Joi.object<${args.subdomain}ApiInterface.Update.Body>({
                    /** @todo Implementation required. */
                });

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.Update.Headers>({
                    "responsible-id": Joi.number().greater(0).required(),
                }).options({ allowUnknown: true });

            const paramsSchema =
                Joi.object<${args.subdomain}ApiInterface.Update.Params>({
                    ${args.camel.subdomain}Id: Joi.number().greater(0).required(),
                });

            const bodyValidation = bodySchema.validate(body);
            const headersValidation = headerSchema.validate(headers);
            const paramsValidation = paramsSchema.validate(params);

            if (bodyValidation.error) {
                const error = new SchemaError.BodyException(bodyValidation.error);
                return res.status(error.code).json(error);
            }

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            if (paramsValidation.error) {
                const error = new SchemaError.ParamsException(paramsValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static updateMany(
        req: ${args.subdomain}ApiInterface.UpdateMany.Request,
        res: ${args.subdomain}ApiInterface.UpdateMany.Response,
        next: NextFunction
    ) {
        try {
            const body = req.body;
            const headers = req.headers;

            const bodySchema = Joi.array()
                .items(
                    Joi.object<${args.subdomain}Model.Request.UpdateManyBase>({
                        /** @todo Implementation required. */
                    })
                )
                .min(1)
                .required();

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.UpdateMany.Headers>({
                    "responsible-id": Joi.number().greater(0).required(),
                }).options({ allowUnknown: true });

            const bodyValidation = bodySchema.validate(body);
            const headersValidation = headerSchema.validate(headers);

            if (bodyValidation.error) {
                const error = new SchemaError.BodyException(bodyValidation.error);
                return res.status(error.code).json(error);
            }

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }
}
`;

const metadataTemplate: DictionaryFn = (args) => `
import { NextFunction } from "express";
import Joi from "joi";

import { SchemaError } from "@/core/errors/schemaError";

import { ${args.subdomain}ApiInterface, ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Schema {
    static create(
        req: ${args.subdomain}ApiInterface.Create.Request,
        res: ${args.subdomain}ApiInterface.Create.Response,
        next: NextFunction
    ) {
        try {
            const body = req.body;
            const headers = req.headers;

            const bodySchema =
                Joi.object<${args.subdomain}ApiInterface.Create.Body>({
                    /** @todo Implementation required. */
                });

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.Create.Headers>({
                    "responsible-id": Joi.number().greater(0).required(),
                }).options({ allowUnknown: true });

            const bodyValidation = bodySchema.validate(body);
            const headersValidation = headerSchema.validate(headers);

            if (bodyValidation.error) {
                const error = new SchemaError.BodyException(bodyValidation.error);
                return res.status(error.code).json(error);
            }

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static get(
        req: ${args.subdomain}ApiInterface.Get.Request,
        res: ${args.subdomain}ApiInterface.Get.Response,
        next: NextFunction
    ) {
        try {
            const params = req.params;

            const paramsSchema =
                Joi.object<${args.subdomain}ApiInterface.Get.Params>({
                     ${args.camel.metadataRelationId}: Joi.number().greater(0).required(),
                    ${args.camel.subdomain}Id: Joi.number().greater(0).required(),
                });

            const paramsValidation = paramsSchema.validate(params);

            if (paramsValidation.error) {
                const error = new SchemaError.ParamsException(paramsValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static getMany(
        req: ${args.subdomain}ApiInterface.GetMany.Request,
        res: ${args.subdomain}ApiInterface.GetMany.Response,
        next: NextFunction
    ) {
        try {
            const params = req.params;

            const paramsSchema =
                Joi.object<${args.subdomain}ApiInterface.Get.Params>({
                    ${args.camel.metadataRelationId}: Joi.number().greater(0).required(),
                });

            const paramsValidation = paramsSchema.validate(params);

            if (paramsValidation.error) {
                const error = new SchemaError.ParamsException(paramsValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }
}
`;

const simpleTemplate: DictionaryFn = (args) => `
import { NextFunction } from "express";
import Joi from "joi";

import { SchemaError } from "@/core/errors/schemaError";

import { ${args.subdomain}ApiInterface, ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Schema {
  static create(
    req: ${args.subdomain}ApiInterface.Create.Request,
    res: ${args.subdomain}ApiInterface.Create.Response,
    next: NextFunction
  ) {
    try {
        const body = req.body;
        const headers = req.headers;

        const bodySchema =
            Joi.object<${args.subdomain}ApiInterface.Create.Body>({
                /** @todo Implementation required. */
            });

        const headerSchema =
            Joi.object<${args.subdomain}ApiInterface.Create.Headers>({
                "responsible-id": Joi.number().greater(0).required(),
                language: Joi.string().min(1).required(),
            }).options({ allowUnknown: true });

        const bodyValidation = bodySchema.validate(body);
        const headersValidation = headerSchema.validate(headers);

        if (bodyValidation.error) {
            const error = new SchemaError.BodyException(bodyValidation.error);
            return res.status(error.code).json(error);
        }

        if (headersValidation.error) {
            const error = new SchemaError.HeadersException(headersValidation.error);
            return res.status(error.code).json(error);
        }

        next();
    } catch (e) {
        const error = new SchemaError.SchemaError(e);
        res.status(error.code).json(error);
    }
  }

    static createMany(
        req: ${args.subdomain}ApiInterface.CreateMany.Request,
        res: ${args.subdomain}ApiInterface.CreateMany.Response,
        next: NextFunction
    ) {
        try {
            const body = req.body;
            const headers = req.headers;

            const bodySchema = Joi.array()
                .items(
                    Joi.object<${args.subdomain}Model.Request.CreateManyBase>({
                        /** @todo Implementation required. */
                    })
                )
                .min(1)
                .required();

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.CreateMany.Headers>({
                    "responsible-id": Joi.number().greater(0).required(),
                }).options({ allowUnknown: true });

            const bodyValidation = bodySchema.validate(body);
            const headersValidation = headerSchema.validate(headers);

            if (bodyValidation.error) {
                const error = new SchemaError.BodyException(bodyValidation.error);
                return res.status(error.code).json(error);
            }

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static deleteMany(
        req: ${args.subdomain}ApiInterface.DeleteMany.Request,
        res: ${args.subdomain}ApiInterface.DeleteMany.Response,
        next: NextFunction
    ) {
        try {
            const headers = req.headers;
            const query = req.query;

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.DeleteMany.Headers>({
                    "responsible-id": Joi.number().greater(0).required(),
                }).options({ allowUnknown: true });
            
            const querySchema =
                Joi.object<${args.subdomain}ApiInterface.DeleteMany.Query>({
                    deletionType: Joi.string()
                        .valid(...${args.subdomain}ApiInterface.DeleteMany.deletionTypes)
                        .optional(),
                });

            const headersValidation = headerSchema.validate(headers);
            const queryValidation = querySchema.validate(query);

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            if (queryValidation.error) {
                const error = new SchemaError.QueryException(queryValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static get(
        req: ${args.subdomain}ApiInterface.Get.Request,
        res: ${args.subdomain}ApiInterface.Get.Response,
        next: NextFunction
    ) {
        try {
            const headers = req.headers;
            const params = req.params;
            const query = req.query;

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.Get.Headers>({
                    language: Joi.string().min(1).required(),
                }).options({ allowUnknown: true });

            const paramsSchema =
                Joi.object<${args.subdomain}ApiInterface.Get.Params>({
                    ${args.camel.subdomain}Id: Joi.number().greater(0).required(),
                });

            const querySchema =
                Joi.object<${args.subdomain}ApiInterface.Get.Query>({});

            const headersValidation = headerSchema.validate(headers);
            const paramsValidation = paramsSchema.validate(params);
            const queryValidation = querySchema.validate(query);

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            if (paramsValidation.error) {
                const error = new SchemaError.ParamsException(paramsValidation.error);
                return res.status(error.code).json(error);
            }

            if (queryValidation.error) {
                const error = new SchemaError.QueryException(queryValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static getMany(
        req: ${args.subdomain}ApiInterface.GetMany.Request,
        res: ${args.subdomain}ApiInterface.GetMany.Response,
        next: NextFunction
    ) {
        try {
            const headers = req.headers;
            const query = req.query;

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.GetMany.Headers>({
                    language: Joi.string().min(1).required(),
                }).options({ allowUnknown: true });

            const querySchema =
                Joi.object<${args.subdomain}ApiInterface.GetMany.Query>({
                    /** @todo: filters implementation */
                });

            const headersValidation = headerSchema.validate(headers);
            const queryValidation = querySchema.validate(query);

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            if (queryValidation.error) {
                const error = new SchemaError.QueryException(queryValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static update(
        req: ${args.subdomain}ApiInterface.Update.Request,
        res: ${args.subdomain}ApiInterface.Update.Response,
        next: NextFunction
    ) {
        try {
            const body = req.body;
            const headers = req.headers;
            const params = req.params;

            const bodySchema =
                Joi.object<${args.subdomain}ApiInterface.Update.Body>({
                    /** @todo Implementation required. */
                });

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.Update.Headers>({
                    "responsible-id": Joi.number().greater(0).required(),
                }).options({ allowUnknown: true });

            const paramsSchema =
                Joi.object<${args.subdomain}ApiInterface.Update.Params>({
                    ${args.camel.subdomain}Id: Joi.number().greater(0).required(),
                });

            const bodyValidation = bodySchema.validate(body);
            const headersValidation = headerSchema.validate(headers);
            const paramsValidation = paramsSchema.validate(params);

            if (bodyValidation.error) {
                const error = new SchemaError.BodyException(bodyValidation.error);
                return res.status(error.code).json(error);
            }

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            if (paramsValidation.error) {
                const error = new SchemaError.ParamsException(paramsValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static updateMany(
        req: ${args.subdomain}ApiInterface.UpdateMany.Request,
        res: ${args.subdomain}ApiInterface.UpdateMany.Response,
        next: NextFunction
    ) {
        try {
            const body = req.body;
            const headers = req.headers;

            const bodySchema = Joi.array()
                .items(
                    Joi.object<${args.subdomain}Model.Request.UpdateManyBase>({
                        /** @todo Implementation required. */
                    })
                )
                .min(1)
                .required();

            const headerSchema =
                Joi.object<${args.subdomain}ApiInterface.UpdateMany.Headers>({
                    "responsible-id": Joi.number().greater(0).required(),
                }).options({ allowUnknown: true });

            const bodyValidation = bodySchema.validate(body);
            const headersValidation = headerSchema.validate(headers);

            if (bodyValidation.error) {
                const error = new SchemaError.BodyException(bodyValidation.error);
                return res.status(error.code).json(error);
            }

            if (headersValidation.error) {
                const error = new SchemaError.HeadersException(headersValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }
}
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
import { NextFunction } from "express";
import Joi from "joi";

import { SchemaError } from "@/core/errors/schemaError";

import { ${args.subdomain}ApiInterface, ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Schema {
    static createMany(
        req: ${args.subdomain}ApiInterface.CreateMany.Request,
        res: ${args.subdomain}ApiInterface.CreateMany.Response,
        next: NextFunction
    ) {
        try {
            const body = req.body;

            const bodySchema = Joi.array()
                .items(
                    Joi.object<${args.subdomain}Model.Request.CreateManyBase>({
                        /** @todo Implementation required. */
                    })
                )
                .min(1)
                .required();

            const bodyValidation = bodySchema.validate(body);

            if (bodyValidation.error) {
                const error = new SchemaError.BodyException(bodyValidation.error);
                return res.status(error.code).json(error);
            }

            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static deleteMany(
        req: ${args.subdomain}ApiInterface.DeleteMany.Request,
        res: ${args.subdomain}ApiInterface.DeleteMany.Response,
        next: NextFunction
    ) {
        try {
            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }

    static getMany(
        req: ${args.subdomain}ApiInterface.GetMany.Request,
        res: ${args.subdomain}ApiInterface.GetMany.Response,
        next: NextFunction
    ) {
        try {
            next();
        } catch (e) {
            const error = new SchemaError.SchemaError(e);
            res.status(error.code).json(error);
        }
    }
}
`;
