import { DictionaryFn, GenerationTypeEnum } from "@/cli/generator/core/types";

export const errorsDictionary: DictionaryFn = (args) => {
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
        "errorsDictionary case not handled. This should not happen."
      );
  }
};

const businessOnlyTemplate: DictionaryFn = (args) => `
import { BaseError, ServerErrorCode } from "@/core/errors/baseError";

export namespace ${args.subdomain}Error {
  export class UnhandledExistsError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledExistsError.name}\`,
          });
      }
  }

  export class UnhandledFindError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindError.name}\`,
          });
      }
  }

  export class UnhandledFindAllError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindAllError.name}\`,
          });
      }
  }

  export class UnhandledFindManyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindManyError.name}\`,
          });
      }
  }

  export class UnhandledInsertError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledInsertError.name}\`,
          });
      }
  }

  export class UnhandledUpdateError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledUpdateError.name}\`,
          });
      }
  }
}
`;

const fullTemplate: DictionaryFn = (args) => `
import { BaseError, ServerErrorCode } from "@/core/errors/baseError";

export namespace ${args.subdomain}Error {
  export class UnhandledDeleteHardError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledDeleteHardError.name}\`,
          });
      }
  }

  export class UnhandledDeleteShyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledDeleteShyError.name}\`,
          });
      }
  }

  export class UnhandledDeleteSoftError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledDeleteSoftError.name}\`,
          });
      }
  }

  export class UnhandledDeleteManyHardError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledDeleteManyHardError.name}\`,
          });
      }
  }

  export class UnhandledDeleteManyShyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledDeleteManyShyError.name}\`,
          });
      }
  }

  export class UnhandledDeleteManySoftError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledDeleteManySoftError.name}\`,
          });
      }
  }

  export class UnhandledExistsError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledExistsError.name}\`,
          });
      }
  }

  export class UnhandledFindError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindError.name}\`,
          });
      }
  }

  export class UnhandledFindAllError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindAllError.name}\`,
          });
      }
  }

  export class UnhandledFindManyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindManyError.name}\`,
          });
      }
  }

  export class UnhandledInsertError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledInsertError.name}\`,
          });
      }
  }

  export class UnhandledInsertManyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledInsertManyError.name}\`,
          });
      }
  }

  export class UnhandledPurgeError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledPurgeError.name}\`,
          });
      }
  }

  export class UnhandledSearchError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledSearchError.name}\`,
          });
      }
  }

  export class UnhandledTruncateError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledTruncateError.name}\`,
          });
      }
  }

  export class UnhandledUpdateError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledUpdateError.name}\`,
          });
      }
  }

  export class UnhandledUpdateManyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledUpdateManyError.name}\`,
          });
      }
  }
}
`;

const metadataTemplate: DictionaryFn = (args) => `
import { BaseError, ServerErrorCode } from "@/core/errors/baseError";

export namespace ${args.subdomain}Error {
  export class UnhandledFindError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindError.name}\`,
          });
      }
  }

  export class UnhandledFindManyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindManyError.name}\`,
          });
      }
  }

  export class UnhandledInsertError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledInsertError.name}\`,
          });
      }
  }

  export class UnhandledPurgeError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledPurgeError.name}\`,
          });
      }
  }

  export class UnhandledTruncateError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledTruncateError.name}\`,
          });
      }
  }
}
`;

const simpleTemplate: DictionaryFn = (args) => `
import { BaseError, ServerErrorCode } from "@/core/errors/baseError";

export namespace ${args.subdomain}Error {
  export class UnhandledExistsError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledExistsError.name}\`,
          });
      }
  }

  export class UnhandledFindError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindError.name}\`,
          });
      }
  }

  export class UnhandledFindManyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindManyError.name}\`,
          });
      }
  }

  export class UnhandledInsertError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledInsertError.name}\`,
          });
      }
  }

  export class UnhandledInsertManyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledInsertManyError.name}\`,
          });
      }
  }

  export class UnhandledPurgeError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledPurgeError.name}\`,
          });
      }
  }

  export class UnhandledTruncateError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledTruncateError.name}\`,
          });
      }
  }

  export class UnhandledUpdateError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledUpdateError.name}\`,
          });
      }
  }

  export class UnhandledUpdateManyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledUpdateManyError.name}\`,
          });
      }
  }
}`;

const weakCatalogTemplate: DictionaryFn = (args) => `
import { BaseError, ServerErrorCode } from "@/core/errors/baseError";

export namespace ${args.subdomain}Error {
  export class UnhandledFindAllError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledFindAllError.name}\`,
          });
      }
  }

  export class UnhandledInsertManyError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledInsertManyError.name}\`,
          });
      }
  }

  export class UnhandledTruncateError extends BaseError {
      constructor(error: any) {
          super({
            code: ServerErrorCode["INTERNAL-SERVER-ERROR"],
            error,
            message: "",
            type: \`\${UnhandledTruncateError.name}\`,
          });
      }
  }
}`;
