import { GeneratorProps } from "@/cli/generator/core/generator";

export type DictionaryFn = (args: GeneratorProps) => string;

export enum GenerationTypeEnum {
  businessOnly = "businessOnly",
  full = "full",
  metadata = "metadata",
  simple = "simple",
  weakCatalog = "weakCatalog",
}

export const generationTypes = [
  `${GenerationTypeEnum.businessOnly}`,
  `${GenerationTypeEnum.full}`,
  `${GenerationTypeEnum.metadata}`,
  `${GenerationTypeEnum.simple}`,
  `${GenerationTypeEnum.weakCatalog}`,
];

export type GenerationType =
  | `${GenerationTypeEnum.businessOnly}`
  | `${GenerationTypeEnum.full}`
  | `${GenerationTypeEnum.metadata}`
  | `${GenerationTypeEnum.simple}`
  | `${GenerationTypeEnum.weakCatalog}`;

/** Expressive enumerator of all API versions available. */
export enum ApiVersionEnum {
  v1 = "v1",
  v2 = "v2",
  v3 = "v3",
  v4 = "v4",
  v5 = "v5",
  v6 = "v6",
  v7 = "v7",
  v8 = "v8",
  v9 = "v9",
}

export const apiVersions = Object.values(ApiVersionEnum);
