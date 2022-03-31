import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const businessDictionary: DictionaryFn = (args) => {
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
        "businessDictionary case not handled. This should not happen."
      );
  }
};

const businessOnlyTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";
 
import { 
    ${args.subdomain}BusinessOps, 
    ${args.subdomain}Model, 
} from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Business {
    constructor() {}

    async exists(args: ${args.subdomain}BusinessOps.Exists.Args): Promise<
    ${args.subdomain}Model.DTO.Exists | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Exists.Op();
        return await business.execute(args);
    }

    async find(args: ${args.subdomain}BusinessOps.Find.Args): Promise<
    ${args.subdomain}Model.DTO.Find | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Find.Op();
        return await business.execute(args);
    }

    async findAll(args: ${args.subdomain}BusinessOps.FindAll.Args): Promise<
    ${args.subdomain}Model.DTO.FindAll | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.FindAll.Op();
        return await business.execute(args);
    }

    async findMany(args: ${args.subdomain}BusinessOps.FindMany.Args): Promise<
    ${args.subdomain}Model.DTO.FindMany | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.FindMany.Op();
        return await business.execute(args);
    }

    async insert(args: ${args.subdomain}BusinessOps.Insert.Args): Promise<
    ${args.subdomain}Model.DTO.Insert | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Insert.Op();
        return await business.execute(args);
    }

    async update(args: ${args.subdomain}BusinessOps.Update.Args): Promise<
    ${args.subdomain}Model.DTO.Update | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Update.Op();
        return await business.execute(args);
    }
}
`;

const fullTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";
 
import { 
    ${args.subdomain}BusinessOps, 
    ${args.subdomain}Model, 
} from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Business {
    constructor() {}

    async deleteHard(args: ${args.subdomain}BusinessOps.DeleteHard.Args): Promise<
    ${args.subdomain}Model.DTO.DeleteHard | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.DeleteHard.Op();
        return await business.execute(args);
    }

    async deleteShy(args: ${args.subdomain}BusinessOps.DeleteShy.Args): Promise<
    ${args.subdomain}Model.DTO.DeleteShy | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.DeleteShy.Op();
        return await business.execute(args);
    }

    async deleteSoft(args: ${args.subdomain}BusinessOps.DeleteSoft.Args): Promise<
    ${args.subdomain}Model.DTO.DeleteSoft | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.DeleteSoft.Op();
        return await business.execute(args);
    }

    async deleteManyHard(args: ${args.subdomain}BusinessOps.DeleteManyHard.Args): Promise<
    ${args.subdomain}Model.DTO.DeleteManyHard | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.DeleteManyHard.Op();
        return await business.execute(args);
    }

    async deleteManyShy(args: ${args.subdomain}BusinessOps.DeleteManyShy.Args): Promise<
    ${args.subdomain}Model.DTO.DeleteManyShy | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.DeleteManyShy.Op();
        return await business.execute(args);
    }

    async deleteManySoft(args: ${args.subdomain}BusinessOps.DeleteManySoft.Args): Promise<
    ${args.subdomain}Model.DTO.DeleteManySoft | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.DeleteManySoft.Op();
        return await business.execute(args);
    }

    async exists(args: ${args.subdomain}BusinessOps.Exists.Args): Promise<
    ${args.subdomain}Model.DTO.Exists | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Exists.Op();
        return await business.execute(args);
    }

    async find(args: ${args.subdomain}BusinessOps.Find.Args): Promise<
    ${args.subdomain}Model.DTO.Find | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Find.Op();
        return await business.execute(args);
    }

    async findAll(args: ${args.subdomain}BusinessOps.FindAll.Args): Promise<
    ${args.subdomain}Model.DTO.FindAll | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.FindAll.Op();
        return await business.execute(args);
    }

    async findMany(args: ${args.subdomain}BusinessOps.FindMany.Args): Promise<
    ${args.subdomain}Model.DTO.FindMany | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.FindMany.Op();
        return await business.execute(args);
    }

    async insert(args: ${args.subdomain}BusinessOps.Insert.Args): Promise<
    ${args.subdomain}Model.DTO.Insert | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Insert.Op();
        return await business.execute(args);
    }

    async insertMany(args: ${args.subdomain}BusinessOps.InsertMany.Args): Promise<
    ${args.subdomain}Model.DTO.InsertMany | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.InsertMany.Op();
        return await business.execute(args);
    }

    async purge(args: ${args.subdomain}BusinessOps.Purge.Args): Promise<
    ${args.subdomain}Model.DTO.Purge | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Purge.Op();
        return await business.execute(args);
    }

    async search(args: ${args.subdomain}BusinessOps.Search.Args): Promise<
    ${args.subdomain}Model.DTO.Search | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Search.Op();
        return await business.execute(args);
    }

    async truncate(args: ${args.subdomain}BusinessOps.Truncate.Args): Promise<
    ${args.subdomain}Model.DTO.Truncate | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Truncate.Op();
        return await business.execute(args);
    }

    async update(args: ${args.subdomain}BusinessOps.Update.Args): Promise<
    ${args.subdomain}Model.DTO.Update | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Update.Op();
        return await business.execute(args);
    }

    async updateMany(args: ${args.subdomain}BusinessOps.UpdateMany.Args): Promise<
    ${args.subdomain}Model.DTO.UpdateMany | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.UpdateMany.Op();
        return await business.execute(args);
    }
}
`;

const metadataTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";
 
import { 
    ${args.subdomain}BusinessOps, 
    ${args.subdomain}Model, 
} from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Business {
    constructor() {}

    async find(args: ${args.subdomain}BusinessOps.Find.Args): Promise<
    ${args.subdomain}Model.DTO.Find | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Find.Op();
        return await business.execute(args);
    }

    async findMany(args: ${args.subdomain}BusinessOps.FindMany.Args): Promise<
    ${args.subdomain}Model.DTO.FindMany | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.FindMany.Op();
        return await business.execute(args);
    }

    async insert(args: ${args.subdomain}BusinessOps.Insert.Args): Promise<
    ${args.subdomain}Model.DTO.Insert | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Insert.Op();
        return await business.execute(args);
    }

    async purge(args: ${args.subdomain}BusinessOps.Purge.Args): Promise<
    ${args.subdomain}Model.DTO.Purge | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Purge.Op();
        return await business.execute(args);
    }

    async truncate(args: ${args.subdomain}BusinessOps.Truncate.Args): Promise<
    ${args.subdomain}Model.DTO.Truncate | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Truncate.Op();
        return await business.execute(args);
    }
}
`;

const simpleTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";
 
import { 
    ${args.subdomain}BusinessOps, 
    ${args.subdomain}Model, 
} from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Business {
    constructor() {}

    async exists(args: ${args.subdomain}BusinessOps.Exists.Args): Promise<
    ${args.subdomain}Model.DTO.Exists | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Exists.Op();
        return await business.execute(args);
    }

    async find(args: ${args.subdomain}BusinessOps.Find.Args): Promise<
    ${args.subdomain}Model.DTO.Find | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Find.Op();
        return await business.execute(args);
    }

    async findMany(args: ${args.subdomain}BusinessOps.FindMany.Args): Promise<
    ${args.subdomain}Model.DTO.FindMany | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.FindMany.Op();
        return await business.execute(args);
    }

    async insert(args: ${args.subdomain}BusinessOps.Insert.Args): Promise<
    ${args.subdomain}Model.DTO.Insert | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Insert.Op();
        return await business.execute(args);
    }

    async insertMany(args: ${args.subdomain}BusinessOps.InsertMany.Args): Promise<
    ${args.subdomain}Model.DTO.InsertMany | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.InsertMany.Op();
        return await business.execute(args);
    }

    async purge(args: ${args.subdomain}BusinessOps.Purge.Args): Promise<
    ${args.subdomain}Model.DTO.Purge | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Purge.Op();
        return await business.execute(args);
    }

    async truncate(args: ${args.subdomain}BusinessOps.Truncate.Args): Promise<
    ${args.subdomain}Model.DTO.Truncate | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Truncate.Op();
        return await business.execute(args);
    }

    async update(args: ${args.subdomain}BusinessOps.Update.Args): Promise<
    ${args.subdomain}Model.DTO.Update | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Update.Op();
        return await business.execute(args);
    }

    async updateMany(args: ${args.subdomain}BusinessOps.UpdateMany.Args): Promise<
    ${args.subdomain}Model.DTO.UpdateMany | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.UpdateMany.Op();
        return await business.execute(args);
    }
}

`;

const weakCatalogTemplate: DictionaryFn = (args) => `
import { BaseError } from "@/core/errors/baseError";
 
import { 
    ${args.subdomain}BusinessOps, 
    ${args.subdomain}Model, 
} from "@/${args.version}/${args.camel.domain}";

export class ${args.subdomain}Business {
    constructor() {}

    async findAll(args: ${args.subdomain}BusinessOps.FindAll.Args): Promise<
    ${args.subdomain}Model.DTO.FindAll | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.FindAll.Op();
        return await business.execute(args);
    }

    async insertMany(args: ${args.subdomain}BusinessOps.InsertMany.Args): Promise<
    ${args.subdomain}Model.DTO.InsertMany | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.InsertMany.Op();
        return await business.execute(args);
    }

    async truncate(args: ${args.subdomain}BusinessOps.Truncate.Args): Promise<
    ${args.subdomain}Model.DTO.Truncate | BaseError
    > {
        const business = new ${args.subdomain}BusinessOps.Truncate.Op();
        return await business.execute(args);
    }
}

`;
