import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const dataAccessDictionary: DictionaryFn = (args) => {
  switch (args.generationType) {
    case GenerationTypeEnum.businessOnly:
      return businessOnlyTemplate(args);
    case GenerationTypeEnum.full:
      return fullTemplate(args);
    case GenerationTypeEnum.metadata:
      return metadataTemplate(args);
    case GenerationTypeEnum.simple:
      return simpleTemplate(args);
    case GenerationTypeEnum.weakCatalog:
      return weakCatalogTemplate(args);
    default:
      throw new Error(
        "dataAccessDictionary case not handled. This should not happen."
      );
  }
};

const businessOnlyTemplate: DictionaryFn = (args) => `
import { prisma } from "@/libs/prisma/prisma";

import { BaseError } from "@/core/errors/baseError";
import { DataAccessError } from "@/core/errors/dataAccessError";

import { ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}DataAccess {
  export interface ExistsArgs {
    ${args.camel.subdomain}Id: number;
  }

  export interface FindArgs {
    ${args.camel.subdomain}Id: number;
  }

  export interface FindAllArgs {}

  export interface FindManyArgs {}

  export interface InsertArgs {
    dao: ${args.subdomain}Model.DAO.Create;
  }

  export interface UpdateArgs {
    ${args.camel.subdomain}Id: number;
    dao: ${args.subdomain}Model.DAO.Update;
  }

  export class DataAccess {
    constructor() {}

    exists = async (
      args: ExistsArgs
    ): Promise<${args.subdomain}Model.DAR.Exists | BaseError> => {
      try {
        const { ${args.camel.subdomain}Id } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });

        return result !== null ? true : false;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };  

    find = async (
      args: FindArgs
    ): Promise<${args.subdomain}Model.DAR.Find | BaseError> => {
      try {
        const { ${args.camel.subdomain}Id } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });

        if (result == null)
          return DataAccessError.operationThrow("ResourceNotFoundError");

        return result;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    findAll = async (
      args: FindAllArgs
    ): Promise<${args.subdomain}Model.DAR.FindAll | BaseError> => {
      try {
        const {} = args;

        return await prisma.${args.dbName}.findMany({
          where: {}
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    findMany = async (
      args: FindManyArgs
    ): Promise<${args.subdomain}Model.DAR.FindMany | BaseError> => {
      try {
        const {} = args;

        return await prisma.${args.dbName}.findMany({
          where: {}
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    insert = async (
      args: InsertArgs
    ): Promise<${args.subdomain}Model.DAR.Insert | BaseError> => {
      try {
        const { dao } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            /** @todo: maybe this would require some fix <3 */
            ${args.camel.subdomain}Id: dao.${args.camel.subdomain}Id,
          },
        });

        if (result != null)
          return DataAccessError.operationThrow("ResourceAlreadyExistsError");

        return await prisma.${args.dbName}.create({
          data: dao,
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    update = async (
      args: UpdateArgs
    ): Promise<${args.subdomain}Model.DAR.Update | BaseError> => {
      try {
        const { ${args.camel.subdomain}Id, dao } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });

        if (result == null)
          return DataAccessError.operationThrow("ResourceNotFoundError");

        return await prisma.${args.dbName}.update({
          data: dao,
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };
  }
}
`;

const fullTemplate: DictionaryFn = (args) => `
import { prisma } from "@/libs/prisma/prisma";

import { BaseError } from "@/core/errors/baseError";
import { DataAccessError } from "@/core/errors/dataAccessError";
import { PaginationDAO } from "@/libs/pagination/models";

import { ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}DataAccess {
  export interface CountArgs {}

  export interface DeleteArgs {
    ${args.camel.subdomain}Id: number;
  }

  export interface DeleteManyArgs {
  }

  export interface ExistsArgs {
    ${args.camel.subdomain}Id: number;
  }

  export interface FindArgs {
    ${args.camel.subdomain}Id: number;
  }

  export interface FindAllArgs {}

  export interface FindManyArgs {}

  export interface GetFirstCursorArgs {}

  export interface GetLastCursorArgs {}

  export interface InsertArgs {
    dao: ${args.subdomain}Model.DAO.Create;
  }

  export interface InsertManyArgs {
    dao: ${args.subdomain}Model.DAO.CreateMany;
  }

  export interface SearchArgs {}

  export interface TruncateArgs {}

  export interface UpdateArgs {
    ${args.camel.subdomain}Id: number;
    dao: ${args.subdomain}Model.DAO.Update;
  }

  export interface UpdateManyArgs {
    dao: ${args.subdomain}Model.DAO.UpdateMany;
  }

  export class DataAccess {
    constructor() {}

    count = async (
      args: CountArgs,
      filter: ${args.subdomain}Model.DAO.Filter
    ): Promise<${args.subdomain}Model.DAR.Count | BaseError> => {
      try {
        const {} = filter;

        return await prisma.${args.dbName}.count({
          where: {}
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    delete = async (
        args: DeleteArgs
    ): Promise<${args.subdomain}Model.DAR.Delete | BaseError> => {
        try {
          const { ${args.camel.subdomain}Id } = args;

          const result = await prisma.${args.dbName}.findFirst({
            where: {
              id: ${args.camel.subdomain}Id
            }
          });

          if (result == null) 
            return DataAccessError.operationThrow("DeletionNotFound");

            return await prisma.${args.dbName}.delete({
              where: {
                id: ${args.camel.subdomain}Id
              }
            });
        } catch (error) {
            return DataAccessError.handle(error);
        }
    }

    deleteMany = async (
      args: DeleteManyArgs
    ): Promise<${args.subdomain}Model.DAR.DeleteMany | BaseError> => {
      try {
        const {} = args;

        const result = await prisma.${args.dbName}.deleteMany({
            where: {}
          });
  
        return result.count;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    }

    exists = async (
      args: ExistsArgs
    ): Promise<${args.subdomain}Model.DAR.Exists | BaseError> => {
      try {
        const { ${args.camel.subdomain}Id } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });

        return result !== null ? true : false;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };  

    find = async (
      args: FindArgs
    ): Promise<${args.subdomain}Model.DAR.Find | BaseError> => {
      try {
        const { ${args.camel.subdomain}Id } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });

        if (result == null)
          return DataAccessError.operationThrow("ResourceNotFoundError");

        return result;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    findAll = async (
      args: FindAllArgs
    ): Promise<${args.subdomain}Model.DAR.FindAll | BaseError> => {
      try {
        const {} = args;

        return await prisma.${args.dbName}.findMany({
          where: {}
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    findMany = async (
      args: FindManyArgs
    ): Promise<${args.subdomain}Model.DAR.FindMany | BaseError> => {
      try {
        const {} = args;

        return await prisma.${args.dbName}.findMany({
          where: {}
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    getFirstCursor = async (
      args: GetFirstCursorArgs,
      filter: ${args.subdomain}Model.DAO.Filter
    ): Promise<${args.subdomain}Model.DAR.GetFirstCursor | BaseError> => {
      try {
        const {} = args;
        const {} = filter;

        const result = await prisma.${args.dbName}.findFirst({
          where: {},
        });

        if (result == null)
          return DataAccessError.operationThrow("ResourceNotFoundError");

        return result.id;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    getLastCursor = async (
      args: GetLastCursorArgs,
      filter: ${args.subdomain}Model.DAO.Filter
    ): Promise<${args.subdomain}Model.DAR.GetLastCursor | BaseError> => {
      try {
        const {} = args;
        const {} = filter;

        const result = await prisma.${args.dbName}.findFirst({
          take: -1,
          where: {},
        });

        if (result == null)
          return DataAccessError.operationThrow("ResourceNotFoundError");

        return result.id;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    insert = async (
      args: InsertArgs
    ): Promise<${args.subdomain}Model.DAR.Insert | BaseError> => {
      try {
        const { dao } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            /** @todo: maybe this would require some fix <3 */
            ${args.camel.subdomain}Id: dao.${args.camel.subdomain}Id,
          },
        });

        if (result != null)
          return DataAccessError.operationThrow("ResourceAlreadyExistsError");

        return await prisma.${args.dbName}.create({
          data: dao,
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    insertMany = async (
      args: InsertManyArgs
    ): Promise<${args.subdomain}Model.DAR.InsertMany | BaseError> => {
      try {
        const { dao } = args;

        const result = await prisma.${args.dbName}.createMany({
          data: dao
        });

        return result.count;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    search = async (
      args: SearchArgs,
      filter: ${args.subdomain}Model.DAO.Filter,
      pagination: PaginationDAO
    ): Promise<${args.subdomain}Model.DAR.Search | BaseError> => {
      try {
        const {} = args;
        const { cursor, skip, take } = pagination;
        const {} = filter;

        return await prisma.${args.dbName}.findMany({
          cursor: {
            id: cursor,
          },
          skip,
          take,
          where: {},
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    truncate = async (args: TruncateArgs): Promise<
      ${args.subdomain}Model.DAR.Truncate | BaseError
    > => {
      try {
        const {} = args;

        await prisma.$executeRaw\`SET FOREIGN_KEY_CHECKS = 0\`;
        /** @todo You should check that the table written here is called the 
         * same as in the DB */
        await prisma.$executeRaw\`TRUNCATE table ${args.dbName}\`;
        await prisma.$executeRaw\`SET FOREIGN_KEY_CHECKS = 1\`;

        return await prisma.${args.dbName}.count();
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    update = async (
      args: UpdateArgs
    ): Promise<${args.subdomain}Model.DAR.Update | BaseError> => {
      try {
        const { ${args.camel.subdomain}Id, dao } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });

        if (result == null)
          return DataAccessError.operationThrow("ResourceNotFoundError");

        return await prisma.${args.dbName}.update({
          data: dao,
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    updateMany = async (
      args: UpdateManyArgs
    ): Promise<${args.subdomain}Model.DAR.UpdateMany | BaseError> => {
      try {
        const { dao } = args;

        const result = await prisma.${args.dbName}.updateMany({
          data: dao,
        });

        return result.count;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };
  }
}
`;

const metadataTemplate: DictionaryFn = (args) => `
import { prisma } from "@/libs/prisma/prisma";

import { BaseError } from "@/core/errors/baseError";
import { DataAccessError } from "@/core/errors/dataAccessError";

import { ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}DataAccess {
  export interface DeleteManyArgs {
    ${args.camel.metadataRelationId}: number;
  }

  export interface FindArgs {
    ${args.camel.subdomain}Id: number;
  }

  export interface FindManyArgs {
     ${args.camel.metadataRelationId}: number;
  }

  export interface InsertArgs {
    dao: ${args.subdomain}Model.DAO.Create;
    ${args.camel.metadataRelationId}: number;
    userResponsibleId: number;
  }

  export interface TruncateArgs {}

  export class DataAccess {
    constructor() {}

    deleteMany = async (
      args: DeleteManyArgs
    ): Promise<${args.subdomain}Model.DAR.DeleteMany | BaseError> => {
     try {
        const { ${args.camel.metadataRelationId} } = args;

        const findResult = await prisma.${args.dbName}.findFirst({
          where: {
            ${args.metadataRelationField}: {
              some: { id: ${args.camel.metadataRelationId} },
            },
          },
        });

        if (findResult == null)
          return DataAccessError.operationThrow("DeletionNotFound");

        const result = await prisma.${args.dbName}.deleteMany({
          where: {
            ${args.metadataRelationField}: {
              some: { id: ${args.camel.metadataRelationId} },
            },
          },
        });

        return result.count;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    }

    find = async (
      args: FindArgs
    ): Promise<${args.subdomain}Model.DAR.Find | BaseError> => {
      try {
        const { ${args.camel.subdomain}Id } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            id: ${args.camel.subdomain}Id,
          },
          include: {
            userResponsible: {
              select: {
                id: true,
              },
            },
          },
        });

        if (result == null)
          return DataAccessError.operationThrow("ResourceNotFoundError");

        return result;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    findMany = async (
      args: FindManyArgs
    ): Promise<${args.subdomain}Model.DAR.FindMany | BaseError> => {
      try {
        const {} = args;

        return await prisma.${args.dbName}.findMany({
          where: {
            ${args.metadataRelationField}: {
              some: { id: ${args.camel.metadataRelationId} },
            },
          },
          include: {
            userResponsible: {
              select: {
                id: true,
              },
            },
          },
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    insert = async (
      args: InsertArgs
    ): Promise<${args.subdomain}Model.DAR.Insert | BaseError> => {
      try {
        const { ${args.camel.metadataRelationId}, dao, userResponsibleId } = args;

        return await prisma.${args.dbName}.create({
          data: {
            modificationDate: dao.modificationDate,
            previousData: dao.previousData,
             ${args.metadataRelationField}: {
              connect: {
                id: ${args.camel.metadataRelationId},
              },
            },
            userResponsible: {
              connect: {
                id: userResponsibleId,
              },
            },
          },
          include: {
            userResponsible: {
              select: {
                id: true,
              },
            },
          },
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    truncate = async (args: TruncateArgs): Promise<
      ${args.subdomain}Model.DAR.Truncate | BaseError
    > => {
      try {
        const {} = args;

        await prisma.$executeRaw\`SET FOREIGN_KEY_CHECKS = 0\`;
        /** @todo You should check that the table written here is called the 
         * same as in the DB */
        await prisma.$executeRaw\`TRUNCATE table ${args.dbName}\`;
        await prisma.$executeRaw\`SET FOREIGN_KEY_CHECKS = 1\`;

        return await prisma.${args.dbName}.count();
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };
  }
}
`;

const simpleTemplate: DictionaryFn = (args) => `
import { prisma } from "@/libs/prisma/prisma";

import { BaseError } from "@/core/errors/baseError";
import { DataAccessError } from "@/core/errors/dataAccessError";

import { ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}DataAccess {
  export interface DeleteArgs {
    ${args.camel.subdomain}Id: number;
  }

  export interface DeleteManyArgs {
  }

  export interface ExistsArgs {
    ${args.camel.subdomain}Id: number;
  }

  export interface FindArgs {
    ${args.camel.subdomain}Id: number;
  }

  export interface FindManyArgs {}

  export interface InsertArgs {
    dao: ${args.subdomain}Model.DAO.Create;
  }

  export interface InsertManyArgs {
    dao: ${args.subdomain}Model.DAO.CreateMany;
  }

  export interface TruncateArgs {}

  export interface UpdateArgs {
    ${args.camel.subdomain}Id: number;
    dao: ${args.subdomain}Model.DAO.Update;
  }

  export interface UpdateManyArgs {
    dao: Array<${args.subdomain}Model.DAO.UpdateMany>;
  }

  export class DataAccess {
    constructor() {}

    delete = async (
        args: DeleteArgs
    ): Promise<${args.subdomain}Model.DAR.Delete | BaseError> => {
        try {
          const { ${args.camel.subdomain}Id } = args;

          const result = await prisma.${args.dbName}.findFirst({
            where: {
              id: ${args.camel.subdomain}Id
            }
          });

          if (result == null) 
            return DataAccessError.operationThrow("DeletionNotFound");

            return await prisma.${args.dbName}.delete({
              where: {
                id: ${args.camel.subdomain}Id
              }
            });
        } catch (error) {
            return DataAccessError.handle(error);
        }
    }

    deleteMany = async (
      args: DeleteManyArgs
    ): Promise<${args.subdomain}Model.DAR.DeleteMany | BaseError> => {
      try {
        const {} = args;

        const result = await prisma.${args.dbName}.deleteMany({
            where: {}
          });
  
        return result.count;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    }

    exists = async (
      args: ExistsArgs
    ): Promise<${args.subdomain}Model.DAR.Exists | BaseError> => {
      try {
        const { ${args.camel.subdomain}Id } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });

        return result !== null ? true : false;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };  

    find = async (
      args: FindArgs
    ): Promise<${args.subdomain}Model.DAR.Find | BaseError> => {
      try {
        const { ${args.camel.subdomain}Id } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });

        if (result == null)
          return DataAccessError.operationThrow("ResourceNotFoundError");

        return result;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    findMany = async (
      args: FindManyArgs
    ): Promise<${args.subdomain}Model.DAR.FindMany | BaseError> => {
      try {
        const {} = args;

        return await prisma.${args.dbName}.findMany({
          where: {}
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    insert = async (
      args: InsertArgs
    ): Promise<${args.subdomain}Model.DAR.Insert | BaseError> => {
      try {
        const { dao } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            /** @todo: maybe this would require some fix <3 */
            ${args.camel.subdomain}Id: dao.${args.camel.subdomain}Id,
          },
        });

        if (result != null)
          return DataAccessError.operationThrow("ResourceAlreadyExistsError");

        return await prisma.${args.dbName}.create({
          data: dao,
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    insertMany = async (
      args: InsertManyArgs
    ): Promise<${args.subdomain}Model.DAR.InsertMany | BaseError> => {
      try {
        const { dao } = args;

        const result = await prisma.${args.dbName}.createMany({
          data: dao
        });

        return result.count;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    truncate = async (args: TruncateArgs): Promise<
    ${args.subdomain}Model.DAR.Truncate | BaseError
  > => {
    try {
      const {} = args;

      await prisma.$executeRaw\`SET FOREIGN_KEY_CHECKS = 0\`;
      /** @todo You should check that the table written here is called the 
       * same as in the DB */
      await prisma.$executeRaw\`TRUNCATE table ${args.dbName}\`;
      await prisma.$executeRaw\`SET FOREIGN_KEY_CHECKS = 1\`;

      return await prisma.${args.dbName}.count();
    } catch (error) {
      return DataAccessError.handle(error);
    }
  };

    update = async (
      args: UpdateArgs
    ): Promise<${args.subdomain}Model.DAR.Update | BaseError> => {
      try {
        const { ${args.camel.subdomain}Id, dao } = args;

        const result = await prisma.${args.dbName}.findFirst({
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });

        if (result == null)
          return DataAccessError.operationThrow("ResourceNotFoundError");

        return await prisma.${args.dbName}.update({
          data: dao,
          where: {
            id: ${args.camel.subdomain}Id,
          },
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    updateMany = async (
      args: UpdateManyArgs
    ): Promise<${args.subdomain}Model.DAR.UpdateMany | BaseError> => {
      try {
        const { dao } = args;

        const result = await prisma.${args.dbName}.updateMany({
          data: dao,
        });

        return result.count;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };
  }
}
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
import { prisma } from "@/libs/prisma/prisma";

import { BaseError } from "@/core/errors/baseError";
import { DataAccessError } from "@/core/errors/dataAccessError";

import { ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}DataAccess {
  export interface FindAllArgs {}

  export interface InsertArgs {
    dao: ${args.subdomain}Model.DAO.Create;
  }

  export interface InsertManyArgs {
    dao: ${args.subdomain}Model.DAO.CreateMany;
  }

  export interface TruncateArgs {}

  export class DataAccess {
    constructor() {}

    findAll = async (
      args: FindAllArgs
    ): Promise<${args.subdomain}Model.DAR.FindAll | BaseError> => {
      try {
        const {} = args;

        return await prisma.${args.dbName}.findMany({
          where: {}
        });
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    insertMany = async (
      args: InsertManyArgs
    ): Promise<${args.subdomain}Model.DAR.InsertMany | BaseError> => {
      try {
        const { dao } = args;

        const result = await prisma.${args.dbName}.createMany({
          data: dao
        });

        return result.count;
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };

    truncate = async (args: TruncateArgs): Promise<
      ${args.subdomain}Model.DAR.Truncate | BaseError
    > => {
      try {
        const {} = args;

        await prisma.$executeRaw\`SET FOREIGN_KEY_CHECKS = 0\`;
        /** @todo You should check that the table written here is called the 
         * same as in the DB */
        await prisma.$executeRaw\`TRUNCATE table ${args.dbName}\`;
        await prisma.$executeRaw\`SET FOREIGN_KEY_CHECKS = 1\`;

        return await prisma.${args.dbName}.count();
      } catch (error) {
        return DataAccessError.handle(error);
      }
    };
  }
}
`;
