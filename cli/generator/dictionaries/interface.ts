import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const interfaceDictionary: DictionaryFn = (args) => {
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
        "interfaceDictionary case not handled. This should not happen."
      );
  }
};

const fullTemplate: DictionaryFn = (args) => `
import { DeletionTypeEnum } from "@/core/app/deletion";
import { ApiRequest } from "@/core/app/api";
import { ResponseBase, ResponseTypeEnum } from "@/core/app/response";
import { StoreHeaders, LanguageHeaders } from "@/core/app/headers";
import { SearchTypeEnum } from "@/core/app/search";
import {
  HeadersBase,
  ParamsBase,
  QueryBase,
  RequestBase,
} from "@/core/app/request";
import { PaginationQuery } from "@/libs/pagination/models";

import { ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}ApiInterface {
    export namespace Create {
        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase, LanguageHeaders, StoreHeaders {}
        export type Body = ${args.subdomain}Model.Request.Create;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.Create>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace CreateMany {
        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase, LanguageHeaders, StoreHeaders {}
        export type Body = ${args.subdomain}Model.Request.CreateMany;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.CreateMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace Delete {
        export const deletionTypes = [
            \`\${DeletionTypeEnum.hard}\`, 
            \`\${DeletionTypeEnum.shy}\`, 
            \`\${DeletionTypeEnum.soft}\`
        ];
        export type DeletionTypesSupported = 
        | \`\${DeletionTypeEnum.hard}\` 
        | \`\${DeletionTypeEnum.shy}\` 
        | \`\${DeletionTypeEnum.soft}\`;

        export interface Params extends ParamsBase {
            ${args.camel.subdomain}Id: string;
        }
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase, StoreHeaders {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.Delete>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace DeleteMany {
        export const deletionTypes = [
            \`\${DeletionTypeEnum.hard}\`, 
            \`\${DeletionTypeEnum.purge}\`,
            \`\${DeletionTypeEnum.shy}\`, 
            \`\${DeletionTypeEnum.soft}\`,
            \`\${DeletionTypeEnum.truncate}\`
        ];
        export type DeletionTypesSupported = 
        | \`\${DeletionTypeEnum.hard}\` 
        | \`\${DeletionTypeEnum.purge}\` 
        | \`\${DeletionTypeEnum.shy}\` 
        | \`\${DeletionTypeEnum.soft}\`
        | \`\${DeletionTypeEnum.truncate}\`;

        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {
            deletionType?: DeletionTypesSupported;
        }
        export interface Headers extends HeadersBase, StoreHeaders {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.DeleteMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace Get {
        export const responseTypes = [
            \`\${ResponseTypeEnum.aggregate}\`,
            \`\${ResponseTypeEnum.partial}\`,
            \`\${ResponseTypeEnum.standard}\`
        ];
        export type ResponseTypeSupported = 
        | \`\${ResponseTypeEnum.aggregate}\`
        | \`\${ResponseTypeEnum.partial}\`
        | \`\${ResponseTypeEnum.standard}\`;

        export interface Params extends ParamsBase {
            ${args.camel.subdomain}Id: string;
        }
        export interface Query extends QueryBase {
            responseType?: ResponseTypeSupported;
        }
        export interface Headers extends HeadersBase, LanguageHeaders {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.Get>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace GetMany {
        export const responseTypes = [
            \`\${ResponseTypeEnum.aggregate}\`,
            \`\${ResponseTypeEnum.partial}\`,
            \`\${ResponseTypeEnum.standard}\`
        ];
        export const searchTypes = [
            \`\${SearchTypeEnum.all}\`,
            \`\${SearchTypeEnum.related}\`,
            \`\${SearchTypeEnum.search}\`
        ];
        export type ResponseTypeSupported = 
        | \`\${ResponseTypeEnum.aggregate}\`
        | \`\${ResponseTypeEnum.partial}\`
        | \`\${ResponseTypeEnum.standard}\`;
        export type SearchTypeSupported = 
        | \`\${SearchTypeEnum.all}\`
        | \`\${SearchTypeEnum.related}\`
        | \`\${SearchTypeEnum.search}\`;

        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase, PaginationQuery, ${args.subdomain}Model.Request.Filter {
            responseType?: ResponseTypeSupported;
            searchType?: SearchTypeSupported;
        }
        export interface Headers extends HeadersBase, LanguageHeaders {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.GetMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace Update {
        export interface Params extends ParamsBase {
            ${args.camel.subdomain}Id: string;
        }
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase, StoreHeaders {}
        export type Body = ${args.subdomain}Model.Request.Update;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.Update>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace UpdateMany {
        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase, StoreHeaders {}
        export type Body = ${args.subdomain}Model.Request.UpdateMany;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.UpdateMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }
}
`;

const metadataTemplate: DictionaryFn = (args) => `
import { DeletionTypeEnum } from "@/core/app/deletion";
import { ApiRequest } from "@/core/app/api";
import { ResponseBase, ResponseTypeEnum } from "@/core/app/response";
import { StoreHeaders } from "@/core/app/headers";
import {
  HeadersBase,
  ParamsBase,
  QueryBase,
  RequestBase,
} from "@/core/app/request";

import { ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}ApiInterface {
    export namespace Create {
        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase, StoreHeaders {}
        export type Body = ${args.subdomain}Model.Request.Create;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.Create>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace DeleteMany {
        export const deletionTypes = [
            \`\${DeletionTypeEnum.purge}\`,
            \`\${DeletionTypeEnum.truncate}\`
        ];
        export type DeletionTypesSupported = 
        | \`\${DeletionTypeEnum.purge}\` 
        | \`\${DeletionTypeEnum.truncate}\`;

        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {
            deletionType?: DeletionTypesSupported;
        }
        export interface Headers extends HeadersBase, StoreHeaders {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.DeleteMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace Get {
        export interface Params extends ParamsBase {
             ${args.camel.metadataRelationId}: string;
            ${args.camel.subdomain}Id: string;
        }
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.Get>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace GetMany {
        export interface Params extends ParamsBase {
            ${args.camel.metadataRelationId}: string;
        }
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.GetMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }
}
`;

const simpleTemplate: DictionaryFn = (args) => `
import { DeletionTypeEnum } from "@/core/app/deletion";
import { ApiRequest } from "@/core/app/api";
import { ResponseBase, ResponseTypeEnum } from "@/core/app/response";
import { StoreHeaders, LanguageHeaders } from "@/core/app/headers";
import { SearchTypeEnum } from "@/core/app/search";
import {
  HeadersBase,
  ParamsBase,
  QueryBase,
  RequestBase,
} from "@/core/app/request";

import { ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}ApiInterface {
    export namespace Create {
        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase, LanguageHeaders, StoreHeaders {}
        export type Body = ${args.subdomain}Model.Request.Create;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.Create>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace CreateMany {
        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase, LanguageHeaders, StoreHeaders {}
        export type Body = ${args.subdomain}Model.Request.CreateMany;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.CreateMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace DeleteMany {
        export const deletionTypes = [
            \`\${DeletionTypeEnum.purge}\`,
            \`\${DeletionTypeEnum.truncate}\`
        ];
        export type DeletionTypesSupported = 
        | \`\${DeletionTypeEnum.purge}\` 
        | \`\${DeletionTypeEnum.truncate}\`;

        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {
            deletionType?: DeletionTypesSupported;
        }
        export interface Headers extends HeadersBase {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.DeleteMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace Get {
        export const responseTypes = [
            \`\${ResponseTypeEnum.aggregate}\`,
            \`\${ResponseTypeEnum.partial}\`,
            \`\${ResponseTypeEnum.standard}\`
        ];
        export type ResponseTypeSupported = 
        | \`\${ResponseTypeEnum.aggregate}\`
        | \`\${ResponseTypeEnum.partial}\`
        | \`\${ResponseTypeEnum.standard}\`;

        export interface Params extends ParamsBase {
            ${args.camel.subdomain}Id: string;
        }
        export interface Query extends QueryBase {
            responseType?: ResponseTypeSupported;
        }
        export interface Headers extends HeadersBase, LanguageHeaders {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.Get>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace GetMany {
        export const responseTypes = [
            \`\${ResponseTypeEnum.aggregate}\`,
            \`\${ResponseTypeEnum.partial}\`,
            \`\${ResponseTypeEnum.standard}\`
        ];
        export const searchTypes = [\`\${SearchTypeEnum.related}\`];
        export type ResponseTypeSupported = 
        | \`\${ResponseTypeEnum.aggregate}\`
        | \`\${ResponseTypeEnum.partial}\`
        | \`\${ResponseTypeEnum.standard}\`;
        export type SearchTypeSupported = \`\${SearchTypeEnum.related}\`;

        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase, ${args.subdomain}Model.Request.Filter {
            responseType?: ResponseTypeSupported;
            searchType?: SearchTypeSupported;
        }
        export interface Headers extends HeadersBase, LanguageHeaders {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.GetMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace Update {
        export interface Params extends ParamsBase {
            ${args.camel.subdomain}Id: string;
        }
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase, StoreHeaders {}
        export type Body = ${args.subdomain}Model.Request.Update;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.Update>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace UpdateMany {
        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase, StoreHeaders {}
        export type Body = ${args.subdomain}Model.Request.UpdateMany;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.UpdateMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }
}
`;

const weakCatalogTemplate: DictionaryFn = (args) => `
import { DeletionTypeEnum } from "@/core/app/deletion";
import { ApiRequest } from "@/core/app/api";
import { ResponseBase, ResponseTypeEnum } from "@/core/app/response";
import { SearchTypeEnum } from "@/core/app/search";
import {
  HeadersBase,
  ParamsBase,
  QueryBase,
  RequestBase,
} from "@/core/app/request";

import { ${args.subdomain}Model } from "@/${args.version}/${args.camel.domain}";

export namespace ${args.subdomain}ApiInterface {
    export namespace CreateMany {
        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {}
        export interface Headers extends HeadersBase {}
        export type Body = ${args.subdomain}Model.Request.CreateMany;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.CreateMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace DeleteMany {
        export const deletionTypes = [\`\${DeletionTypeEnum.truncate}\`];
        export type DeletionTypesSupported = \`\${DeletionTypeEnum.truncate}\`;

        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {
            deletionType?: DeletionTypesSupported;
        }
        export interface Headers extends HeadersBase {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.DeleteMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }

    export namespace GetMany {
        export const responseTypes = [\`\${ResponseTypeEnum.standard}\`];
        export const searchTypes = [\`\${SearchTypeEnum.all}\`];
        export type ResponseTypeSupported = \`\${ResponseTypeEnum.standard}\`;
        export type SearchTypeSupported =  \`\${SearchTypeEnum.all}\`;

        export interface Params extends ParamsBase {}
        export interface Query extends QueryBase {
            responseType?: ResponseTypeSupported;
            searchType?: SearchTypeSupported;
        }
        export interface Headers extends HeadersBase {}
        export type Body = void;
        export type Request = RequestBase<
            Body,
            Headers,
            Params,
            Response,
            Query
        >;
        export type Response = ResponseBase<${args.subdomain}Model.Response.GetMany>;
        export type Props = ApiRequest<Body, Headers, Params, Query>;
    }
}
`;
