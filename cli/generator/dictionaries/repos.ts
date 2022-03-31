import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const reposDictionary: DictionaryFn = (args) => {
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
        "reposDictionary case not handled. This should not happen."
      );
  }
};

const businessOnlyTemplate: DictionaryFn = (args) => `
import { ${args.subdomain}DataAccess } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}Repo {
  export interface ExistsArgs extends ${args.subdomain}DataAccess.ExistsArgs {}

  export interface FindArgs extends ${args.subdomain}DataAccess.FindArgs {}

  export interface FindAllArgs extends ${args.subdomain}DataAccess.FindAllArgs {}

  export interface FindManyArgs extends ${args.subdomain}DataAccess.FindManyArgs {}

  export interface InsertArgs extends ${args.subdomain}DataAccess.InsertArgs {}

  export interface UpdateArgs extends ${args.subdomain}DataAccess.UpdateArgs {}

  export class Repo {
    private DA: ${args.subdomain}DataAccess.DataAccess;

    constructor() {
      this.DA = new ${args.subdomain}DataAccess.DataAccess();
    }

    async exists(args: ExistsArgs) {
      return await this.DA.exists(args);
    }

    async find(args: FindArgs) {
      return await this.DA.find(args);
    }

    async findAll(args: FindAllArgs) {
      return await this.DA.findAll(args);
    }

    async findMany(args: FindManyArgs) {
      return await this.DA.findMany(args);
    }

    async insert(args: InsertArgs) {
      return await this.DA.insert(args);
    }

    async update(args: UpdateArgs) {
      return await this.DA.update(args);
    }
  }
}
`;

const fullTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";
import { PaginationRequest } from "@/libs/pagination/models";
import { Pagination } from "@/libs/pagination/pagination";

import { ${args.subdomain}DataAccess, ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}Repo {
  export interface DeleteArgs extends ${args.subdomain}DataAccess.DeleteArgs {}

  export interface DeleteManyArgs extends ${args.subdomain}DataAccess.DeleteManyArgs {}

  export interface ExistsArgs extends ${args.subdomain}DataAccess.ExistsArgs {}

  export interface FindArgs extends ${args.subdomain}DataAccess.FindArgs {}

  export interface FindAllArgs extends ${args.subdomain}DataAccess.FindAllArgs {}

  export interface FindManyArgs extends ${args.subdomain}DataAccess.FindManyArgs {}

  export interface SearchArgs {
    args: ${args.subdomain}DataAccess.SearchArgs;
    filter: ${args.subdomain}Model.DAO.Filter;
    pagination: PaginationRequest;
  }

  export interface InsertArgs extends ${args.subdomain}DataAccess.InsertArgs {}

  export interface InsertManyArgs extends ${args.subdomain}DataAccess.InsertManyArgs {}

  export interface TruncateArgs extends ${args.subdomain}DataAccess.TruncateArgs {}

  export interface UpdateArgs extends ${args.subdomain}DataAccess.UpdateArgs {}

  export interface UpdateManyArgs extends ${args.subdomain}DataAccess.UpdateManyArgs {}

  export class Repo {
    private DA: ${args.subdomain}DataAccess.DataAccess;
    private pagination: Pagination<
      ${args.subdomain}DataAccess.SearchArgs,
      ${args.subdomain}Model.Domain.Root,
      ${args.subdomain}Model.DAO.Filter
    >;

    constructor() {
      this.DA = new ${args.subdomain}DataAccess.DataAccess();
      this.pagination = new Pagination();
    }

    async delete(args: DeleteArgs) {
      return await this.DA.delete(args);
    }

    async deleteMany(args: DeleteManyArgs) {
      return await this.DA.deleteMany(args);
    }

    async exists(args: ExistsArgs) {
      return await this.DA.exists(args);
    }

    async find(args: FindArgs) {
      return await this.DA.find(args);
    }

    async findAll(args: FindAllArgs) {
      return await this.DA.findAll(args);
    }

    async findMany(args: FindManyArgs) {
      return await this.DA.findMany(args);
    }

    async insert(args: InsertArgs) {
      return await this.DA.insert(args);
    }

    async insertMany(args: InsertManyArgs) {
        return await this.DA.insertMany(args);
    }

    async search(_args: SearchArgs): Promise<${args.subdomain}Model.DTO.SearchBase | BaseError> {
      const { filter, pagination, args } = _args;

      this.pagination.init({
        args,
        filter,
        getCountFn: this.DA.count,
        getFirstCursorFn: this.DA.getFirstCursor,
        getLastCursorFn: this.DA.getLastCursor,
        getListFn: this.DA.search,
        pagination,
        sortKey: "creationDate",
        sortOrder: "desc",
      });

      return await this.pagination.execute();
    }

    async truncate(args: TruncateArgs) {
        return await this.DA.truncate(args);
    }

    async update(args: UpdateArgs) {
      return await this.DA.update(args);
    }

    async updateMany(args: UpdateManyArgs) {
        return await this.DA.updateMany(args);
    }
  }
}
`;

const metadataTemplate: DictionaryFn = (args) => `
import { ${args.subdomain}DataAccess, ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}Repo {
  export interface DeleteManyArgs extends ${args.subdomain}DataAccess.DeleteManyArgs {}

  export interface FindArgs extends ${args.subdomain}DataAccess.FindArgs {}

  export interface FindManyArgs extends ${args.subdomain}DataAccess.FindManyArgs {}

  export interface InsertArgs extends ${args.subdomain}DataAccess.InsertArgs {}

  export interface TruncateArgs extends ${args.subdomain}DataAccess.TruncateArgs {}

  export class Repo {
    private DA: ${args.subdomain}DataAccess.DataAccess;

    constructor() {
      this.DA = new ${args.subdomain}DataAccess.DataAccess();
    }

    async deleteMany(args: DeleteManyArgs) {
      return await this.DA.deleteMany(args);
    }

    async find(args: FindArgs) {
      return await this.DA.find(args);
    }

    async findMany(args: FindManyArgs) {
      return await this.DA.findMany(args);
    }

    async insert(args: InsertArgs) {
      return await this.DA.insert(args);
    }

    async truncate(args: TruncateArgs) {
        return await this.DA.truncate(args);
    }
  }
}
`;

const simpleTemplate: DictionaryFn = (args) => `
import { ${args.subdomain}DataAccess } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}Repo {
  export interface DeleteArgs extends ${args.subdomain}DataAccess.DeleteArgs {}

  export interface DeleteManyArgs extends ${args.subdomain}DataAccess.DeleteManyArgs {}

  export interface ExistsArgs extends ${args.subdomain}DataAccess.ExistsArgs {}

  export interface FindArgs extends ${args.subdomain}DataAccess.FindArgs {}

  export interface FindManyArgs extends ${args.subdomain}DataAccess.FindManyArgs {}

  export interface InsertArgs extends ${args.subdomain}DataAccess.InsertArgs {}

  export interface InsertManyArgs extends ${args.subdomain}DataAccess.InsertManyArgs {}

  export interface TruncateArgs extends ${args.subdomain}DataAccess.TruncateArgs {}

  export interface UpdateArgs extends ${args.subdomain}DataAccess.UpdateArgs {}

  export interface UpdateManyArgs extends ${args.subdomain}DataAccess.UpdateManyArgs {}

  export class Repo {
    private DA: ${args.subdomain}DataAccess.DataAccess;

    constructor() {
      this.DA = new ${args.subdomain}DataAccess.DataAccess();
    }

    async delete(args: DeleteArgs) {
      return await this.DA.delete(args);
    }

    async deleteMany(args: DeleteManyArgs) {
      return await this.DA.deleteMany(args);
    }

    async exists(args: ExistsArgs) {
      return await this.DA.exists(args);
    }

    async find(args: FindArgs) {
      return await this.DA.find(args);
    }

    async findMany(args: FindManyArgs) {
      return await this.DA.findMany(args);
    }

    async insert(args: InsertArgs) {
      return await this.DA.insert(args);
    }

    async insertMany(args: InsertManyArgs) {
        return await this.DA.insertMany(args);
    }

    async truncate(args: TruncateArgs) {
        return await this.DA.truncate(args);
    }

    async update(args: UpdateArgs) {
      return await this.DA.update(args);
    }

    async updateMany(args: UpdateManyArgs) {
        return await this.DA.updateMany(args);
    }
  }
}
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
import { ${args.subdomain}DataAccess } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}Repo {
  export interface FindAllArgs extends ${args.subdomain}DataAccess.FindAllArgs {}

  export interface InsertManyArgs extends ${args.subdomain}DataAccess.InsertManyArgs {}

  export interface TruncateArgs extends ${args.subdomain}DataAccess.TruncateArgs {}

  export class Repo {
    private DA: ${args.subdomain}DataAccess.DataAccess;
   
    constructor() {
      this.DA = new ${args.subdomain}DataAccess.DataAccess();
    }

    async findAll(args: FindAllArgs) {
      return await this.DA.findAll(args);
    }

    async insertMany(args: InsertManyArgs) {
        return await this.DA.insertMany(args);
    }

    async truncate(args: TruncateArgs) {
        return await this.DA.truncate(args);
    }
  }
}
`;
