import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const modelsDictionary: DictionaryFn = (args) => {
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
        "modelsDictionary case not handled. This should not happen."
      );
  }
};

const businessOnlyTemplate: DictionaryFn = (args) => `
import { ${args.dbName}, Prisma } from "@prisma/client";

export namespace ${args.subdomain}Model {
  export namespace DAO {
    export type Create = Prisma.${args.dbName}CreateManyInput;
    export type Update = Prisma.${args.dbName}UncheckedUpdateManyInput
  }

  export namespace DAR {
    export type Exists = boolean;
    export type Find = Domain.Base;
    export type FindAll = Array<Domain.Base>;
    export type FindMany = Array<Domain.Base>;
    export type Insert = Domain.Base;
    export type Update = Domain.Base;
  }

  export namespace Domain {
    export interface Aggregate extends Root {}
    export interface Base extends ${args.dbName} {}
    /** @todo: You may want to edit this Omit implementation. */
    export interface Partial extends Omit<Root, ""> {}
    export interface Root extends Base {}
  }

  export namespace DTO {
    export type Exists = boolean;
    export type Find = Domain.Aggregate | Domain.Partial | Domain.Root;
    export type FindAll = Array<Domain.Aggregate | Domain.Partial | Domain.Root>;
    export type FindAllBase = Array<Domain.Base>;
    export type FindMany = Array<Domain.Aggregate | Domain.Partial | Domain.Root>;
    export type FindManyBase = Array<Domain.Base>;
    export type Insert = Domain.Root;
    export type Update = Domain.Root;
  }

  export namespace Request {
    /** @todo: include the pick fields! */
    export type Create = Pick<DAO.Create, "">;
    /** @todo: include the pick fields! */
    export type Update = Pick<DAO.Update, "">;
  }

  export namespace Response {}
}
`;

const fullTemplate: DictionaryFn = (args) => `
import { PaginatedResponse } from "@/libs/pagination/models";

import { ${args.dbName}, Prisma } from "@prisma/client";

export namespace ${args.subdomain}Model {
  export namespace DAO {
    export interface Filter {}
    export type Create = Prisma.${args.dbName}CreateManyInput;
    export type CreateMany = Prisma.Enumerable<Create>;
    export type Update = Prisma.${args.dbName}UncheckedUpdateManyInput
    export type UpdateMany = Array<Update>;
  }

  export namespace DAR {
    export type Count = number;
    export type Delete = Domain.Base;
    export type DeleteMany = number;
    export type Exists = boolean;
    export type Find = Domain.Base;
    export type FindAll = Array<Domain.Base>;
    export type FindMany = Array<Domain.Base>;
    export type GetFirstCursor = number;
    export type GetLastCursor = number;
    export type Insert = Domain.Base;
    export type InsertMany = number;
    export type Search = Array<Domain.Base>;
    export type Truncate = number;
    export type Update = Domain.Base;
    export type UpdateMany = number;
  }

  export namespace Domain {
    export interface Aggregate extends Root {}
    export interface Base extends ${args.dbName} {}
    /** @todo: You may want to edit this Omit implementation. */
    export interface Partial extends Omit<Root, ""> {}
    export interface Root extends Base {}
  }

  export namespace DTO {
    export type DeleteHard = Domain.Root;
    export type DeleteShy = Domain.Root;
    export type DeleteSoft = Domain.Root;
    export type DeleteManyHard = void;
    export type DeleteManyShy = void;
    export type DeleteManySoft = void;
    export type Exists = boolean;
    export type Find = Domain.Aggregate | Domain.Partial | Domain.Root;
    export type FindAll = Array<Domain.Aggregate | Domain.Partial | Domain.Root>;
    export type FindAllBase = Array<Domain.Base>;
    export type FindMany = Array<Domain.Aggregate | Domain.Partial | Domain.Root>;
    export type FindManyBase = Array<Domain.Base>;
    export type Insert = Domain.Root;
    export type InsertMany = void;
    export type Purge = void;
    export type Search = PaginatedResponse<Domain.Aggregate | Domain.Partial | Domain.Root>;
    export type SearchBase = PaginatedResponse<Domain.Base>;
    export type Truncate = void;
    export type Update = Domain.Root;
    export type UpdateMany = void;
  }

  export namespace Request {
    export interface Filter {}
    /** @todo: include the pick fields! */
    export type Create = Pick<DAO.Create, "">;
    export type CreateMany = Array<CreateManyBase>;
    export type CreateManyBase = Create;
    /** @todo: include the pick fields! */
    export type Update = Pick<DAO.Update, "">;
    export type UpdateMany = Array<Update>;
    export type UpdateManyBase = Update;
  }

  export namespace Response {
    export type Create = Domain.Root;
    export type CreateMany = void;
    export type Delete = Domain.Root;
    export type DeleteMany = void;
    export type Get = Domain.Aggregate | Domain.Partial | Domain.Root;
    export type GetMany = Array<Domain.Aggregate | Domain.Partial | Domain.Root> | PaginatedResponse<Domain.Aggregate | Domain.Partial | Domain.Root>; 
    export type Update = Domain.Root;
    export type UpdateMany = void;
  
  }
}
`;

const metadataTemplate: DictionaryFn = (args) => `
import { ${args.dbName}, Prisma } from "@prisma/client";

import { DaoMetadata, Metadata } from "@/core/domain/metadata";

export namespace ${args.subdomain}Model {
  export namespace DAO {
    export type Create = Prisma.${args.dbName}CreateManyInput;
  }

  export namespace DAR {
    export type DeleteMany = number;
    export type Find = Domain.Base & DaoMetadata;
    export type FindMany = Array<Domain.Base & DaoMetadata>;
    export type Insert = Domain.Base & DaoMetadata;
    export type Truncate = number;
  }

  export namespace Domain {
    export interface Base extends ${args.dbName} {}
    export interface Root extends Base, Metadata {}
  }

  export namespace DTO {
    export type Find = Domain.Aggregate | Domain.Partial | Domain.Root;
    export type FindMany = Array<Domain.Aggregate | Domain.Partial | Domain.Root>;
    export type FindManyBase = Array<Domain.Base>;
    export type Insert = Domain.Root;
    export type Purge = void;
    export type Truncate = void;
  }

  export namespace Request {
    /** @todo: include the pick fields! */
    export type Create = Pick<DAO.Create, "">;
  }

  export namespace Response {
    export type Create = Domain.Root;
    export type DeleteMany = void;
    export type Get = Domain.Aggregate | Domain.Partial | Domain.Root;
    export type GetMany = Array<Domain.Aggregate | Domain.Partial | Domain.Root> | PaginatedResponse<Domain.Aggregate | Domain.Partial | Domain.Root>; 
  
  }
}
`;

const simpleTemplate: DictionaryFn = (args) => `
import { PaginatedResponse } from "@/libs/pagination/models";

import { ${args.dbName}, Prisma } from "@prisma/client";

export namespace ${args.subdomain}Model {
  export namespace DAO {
    export interface Filter {}
    export type Create = Prisma.${args.dbName}CreateManyInput;
    export type CreateMany = Prisma.Enumerable<Create>;
    export type Update = Prisma.${args.dbName}UncheckedUpdateManyInput
    export type UpdateMany = Array<Update>;
  }

  export namespace DAR {
    export type Delete = Domain.Base;
    export type DeleteMany = number;
    export type Exists = boolean;
    export type Find = Domain.Base;
    export type FindMany = Array<Domain.Base>;
    export type Insert = Domain.Base;
    export type InsertMany = number;
    export type Purge = void;
    export type Truncate = number;
    export type Update = Domain.Base;
    export type UpdateMany = number;
  }

  export namespace Domain {
    export interface Aggregate extends Root {}
    export interface Base extends ${args.dbName} {}
    /** @todo: You may want to edit this Omit implementation. */
    export interface Partial extends Omit<Root, ""> {}
    export interface Root extends Base {}
  }

  export namespace DTO {
    export type Exists = boolean;
    export type Find = Domain.Aggregate | Domain.Partial | Domain.Root;
    export type FindMany = Array<Domain.Aggregate | Domain.Partial | Domain.Root>;
    export type Insert = Domain.Root;
    export type InsertMany = void;
    export type Purge = void;
    export type Truncate = void;
    export type Update = Domain.Root;
    export type UpdateMany = void;
  }

  export namespace Request {
    export interface Filter {}
    /** @todo: include the pick fields! */
    export type Create = Pick<DAO.Create, "">;
    export type CreateMany = Array<CreateManyBase>;
    export type CreateManyBase = Create;
    /** @todo: include the pick fields! */
    export type Update = Pick<DAO.Update, "">;
    export type UpdateMany = Array<UpdateManyBase>;
    export type UpdateManyBase = Update;
  }

  export namespace Response {
    export type Create = Domain.Root;
    export type CreateMany = void;
    export type Delete = Domain.Root;
    export type DeleteMany = void;
    export type Get = Domain.Aggregate | Domain.Partial | Domain.Root;
    export type GetMany = Array<Domain.Aggregate | Domain.Partial | Domain.Root> | PaginatedResponse<Domain.Aggregate | Domain.Partial | Domain.Root>; 
    export type Update = Domain.Root;
    export type UpdateMany = void;
  
  }
}
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
import { ${args.dbName}, Prisma } from "@prisma/client";

export namespace ${args.subdomain}Model {
  export namespace DAO {
    export type Create = Prisma.${args.dbName}CreateManyInput;
    export type CreateMany = Prisma.Enumerable<Create>;
  }

  export namespace DAR {
    export type DeleteMany = number;
    export type FindAll = Array<Domain.Base>;
    export type InsertMany = number;
    export type Truncate = number;
  }

  export namespace Domain {
    export interface Base extends ${args.dbName} {}
    export interface Root extends Base {}
  }

  export namespace DTO {
    export type FindAll = Array<Domain.Root>;
    export type InsertMany = void;
    export type Purge = void;
    export type Truncate = void;
  }

  export namespace Request {
    export type CreateMany = Array<CreateManyBase>;
    /** @todo: include the pick fields! */
    export type CreateManyBase = Pick<DAO.Create, "">;
  }

  export namespace Response {
    export type CreateMany = void;
    export type DeleteMany = void;
    export type GetMany = Array<Domain.Root>; 
  }
}
`;
