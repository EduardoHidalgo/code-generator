import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const routesDictionary: DictionaryFn = (args) => {
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
        "routesDictionary case not handled. This should not happen."
      );
  }
};

const fullTemplate: DictionaryFn = (args) => `
import { RouteError } from "@/core/errors/apiError";
import { tokenAuthMiddleware } from "@/server/middlewares/tokenAuth";
import { logMiddleware } from "@/server/middlewares/log";
import { Route } from "@/core/app/routes";

import { 
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Module,
    ${args.subdomain}Schema,
} from "@/${args.version}/${args.camel.domain}";

export const ${args.subdomain}Routes: Route = (args) => {
  const { basePath, router } = args;

  router.get(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.getMany,
    async (
      req: ${args.subdomain}ApiInterface.GetMany.Request,
      res: ${args.subdomain}ApiInterface.GetMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.getMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.get(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}/:${args.camel.subdomain}Id\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.get,
    async (
      req: ${args.subdomain}ApiInterface.Get.Request,
      res: ${args.subdomain}ApiInterface.Get.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.get(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.delete(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.deleteMany,
    async (
      req: ${args.subdomain}ApiInterface.DeleteMany.Request,
      res: ${args.subdomain}ApiInterface.DeleteMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.deleteMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.delete(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}/:${args.camel.subdomain}Id\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.delete,
    async (
      req: ${args.subdomain}ApiInterface.Delete.Request,
      res: ${args.subdomain}ApiInterface.Delete.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.delete(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.post(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.createMany,
    async (
      req: ${args.subdomain}ApiInterface.CreateMany.Request,
      res: ${args.subdomain}ApiInterface.CreateMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.createMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.post(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}/bulk\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.create,
    async (
      req: ${args.subdomain}ApiInterface.Create.Request,
      res: ${args.subdomain}ApiInterface.Create.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.create(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.put(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.updateMany,
    async (
      req: ${args.subdomain}ApiInterface.UpdateMany.Request,
      res: ${args.subdomain}ApiInterface.UpdateMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.updateMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.put(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}/:${args.camel.subdomain}Id\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.update,
    async (
      req: ${args.subdomain}ApiInterface.Update.Request,
      res: ${args.subdomain}ApiInterface.Update.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.update(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );
}
`;

const metadataTemplate: DictionaryFn = (args) => `
import { RouteError } from "@/core/errors/apiError";
import { tokenAuthMiddleware } from "@/server/middlewares/tokenAuth";
import { logMiddleware } from "@/server/middlewares/log";
import { Route } from "@/core/app/routes";

import { 
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Module,
    ${args.subdomain}Schema,
} from "@/${args.version}/${args.camel.domain}";

export const ${args.subdomain}Routes: Route = (args) => {
  const { basePath, router } = args;

  router.get(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.getMany,
    async (
      req: ${args.subdomain}ApiInterface.GetMany.Request,
      res: ${args.subdomain}ApiInterface.GetMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.getMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.get(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}/:${args.camel.subdomain}Id\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.get,
    async (
      req: ${args.subdomain}ApiInterface.Get.Request,
      res: ${args.subdomain}ApiInterface.Get.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.get(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.post(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}/bulk\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.create,
    async (
      req: ${args.subdomain}ApiInterface.Create.Request,
      res: ${args.subdomain}ApiInterface.Create.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.create(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );
}
`;

const simpleTemplate: DictionaryFn = (args) => `
import { RouteError } from "@/core/errors/apiError";
import { tokenAuthMiddleware } from "@/server/middlewares/tokenAuth";
import { logMiddleware } from "@/server/middlewares/log";
import { Route } from "@/core/app/routes";

import { 
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Module,
    ${args.subdomain}Schema,
} from "@/${args.version}/${args.camel.domain}";

export const ${args.subdomain}Routes: Route = (args) => {
  const { basePath, router } = args;

  router.get(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.getMany,
    async (
      req: ${args.subdomain}ApiInterface.GetMany.Request,
      res: ${args.subdomain}ApiInterface.GetMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.getMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.get(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}/:${args.camel.subdomain}Id\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.get,
    async (
      req: ${args.subdomain}ApiInterface.Get.Request,
      res: ${args.subdomain}ApiInterface.Get.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.get(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.delete(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.deleteMany,
    async (
      req: ${args.subdomain}ApiInterface.DeleteMany.Request,
      res: ${args.subdomain}ApiInterface.DeleteMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.deleteMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.post(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.createMany,
    async (
      req: ${args.subdomain}ApiInterface.CreateMany.Request,
      res: ${args.subdomain}ApiInterface.CreateMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.createMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.post(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}/bulk\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.create,
    async (
      req: ${args.subdomain}ApiInterface.Create.Request,
      res: ${args.subdomain}ApiInterface.Create.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.create(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.put(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.updateMany,
    async (
      req: ${args.subdomain}ApiInterface.UpdateMany.Request,
      res: ${args.subdomain}ApiInterface.UpdateMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.updateMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.put(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}/:${args.camel.subdomain}Id\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.update,
    async (
      req: ${args.subdomain}ApiInterface.Update.Request,
      res: ${args.subdomain}ApiInterface.Update.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.update(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );
}
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
import { RouteError } from "@/core/errors/apiError";
import { tokenAuthMiddleware } from "@/server/middlewares/tokenAuth";
import { logMiddleware } from "@/server/middlewares/log";
import { Route } from "@/core/app/routes";

import { 
    ${args.subdomain}ApiInterface,
    ${args.subdomain}Module,
    ${args.subdomain}Schema,
} from "@/${args.version}/${args.camel.domain}";

export const ${args.subdomain}Routes: Route = (args) => {
  const { basePath, router } = args;

  router.get(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.getMany,
    async (
      req: ${args.subdomain}ApiInterface.GetMany.Request,
      res: ${args.subdomain}ApiInterface.GetMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.getMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.delete(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.deleteMany,
    async (
      req: ${args.subdomain}ApiInterface.DeleteMany.Request,
      res: ${args.subdomain}ApiInterface.DeleteMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.deleteMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );

  router.post(
    /** @todo: Maybe you will want to update the endpoint uri ;D */
    \`\${basePath}/${args.camel.subdomain}\`,
    logMiddleware,
    tokenAuthMiddleware,
    ${args.subdomain}Schema.createMany,
    async (
      req: ${args.subdomain}ApiInterface.CreateMany.Request,
      res: ${args.subdomain}ApiInterface.CreateMany.Response
    ) => {
      try {
        const module = new ${args.subdomain}Module();

        const { value } = await module.createMany(req);

        res.status(value.code).json(value.getValue());
      } catch (e) {
        const error = new RouteError(e);
        return res.status(error.code).json(error);
      }
    }
  );
}
`;
