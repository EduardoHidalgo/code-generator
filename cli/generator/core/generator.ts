import { execSync } from "child_process";

import { FileWriter } from "@/cli/utils/fileWriter";
import { camelize } from "@/cli/utils/format";
import { GenerationType, GenerationTypeEnum } from "@/cli/generator/core/types";
import { structure } from "@/cli/generator/core/structure";
import * as dictionaries from "@/cli/generator/dictionaries/index";

export interface GeneratorMainArgs {
  generationType: GenerationType;
  domain: string;
  subdomain: string;
  version: string;
  dbName: string;
}

export interface GeneratorMetadataArgs {
  metadataRelation?: string;
  metadataRelationField?: string;
}

export type GeneratorArgs = GeneratorMainArgs & GeneratorMetadataArgs;

export interface GeneratorProps
  extends GeneratorMainArgs,
    GeneratorMetadataArgs {
  camel: {
    domain: string;
    subdomain: string;
    metadataRelationId?: string;
    metadataRelation?: string;
  };
}

abstract class GeneratorBase implements GeneratorProps {
  fw: FileWriter;

  generationType: GenerationType;
  domain: string;
  subdomain: string;
  version: string;
  dbName: string;

  metadataRelation?: string;
  metadataRelationField?: string;

  camel: {
    domain: string;
    subdomain: string;
    metadataRelationId?: string;
    metadataRelation?: string;
  };

  constructor(args: GeneratorArgs) {
    this.fw = new FileWriter();

    this.version = args.version;
    this.generationType = args.generationType;
    this.domain = args.domain;
    this.subdomain = args.subdomain;
    this.dbName = args.dbName;

    this.camel = {
      domain: camelize(args.domain),
      subdomain: camelize(args.subdomain),
      metadataRelationId: args.metadataRelation
        ? camelize(args.metadataRelation)
        : undefined,
      metadataRelation: args.metadataRelation
        ? camelize(args.metadataRelation)
        : undefined,
    };

    this.metadataRelation = args.metadataRelation;
    this.metadataRelationField = args.metadataRelationField;
  }

  getProps(): GeneratorProps {
    return {
      camel: {
        ...this.camel,
      },
      domain: this.domain,
      generationType: this.generationType,
      subdomain: this.subdomain,
      version: this.version,
      dbName: this.dbName,
      metadataRelation: this.metadataRelation,
      metadataRelationField: this.metadataRelationField,
    };
  }
}

export class Generator extends GeneratorBase {
  private apiLayerGenerator: ApiLayerGenerator;
  private infraLayerGenerator: InfraLayerGenerator;
  private domainLayerGenerator: DomainLayerGenerator;

  constructor(args: GeneratorArgs) {
    super(args);

    this.apiLayerGenerator = new ApiLayerGenerator(args);
    this.infraLayerGenerator = new InfraLayerGenerator(args);
    this.domainLayerGenerator = new DomainLayerGenerator(args);
  }

  execute() {
    if (this.generationType == GenerationTypeEnum.metadata) return;

    this.build();
    this.postBuild();
  }

  private build() {
    this.createApiLayer();
    this.createInfraLayer();
    this.createDomainLayer();
    this.createGroupIndex();
  }

  private postBuild() {
    console.log("Generator executed successfully!");
    console.log("Formating generated code...");

    execSync("npm run format", { stdio: "inherit" });
  }

  private createApiLayer() {
    switch (this.generationType) {
      case GenerationTypeEnum.businessOnly:
        break;
      default:
        this.apiLayerGenerator.createApiFolder();
        this.apiLayerGenerator.createInterface();
        this.apiLayerGenerator.createRoutes();
        this.apiLayerGenerator.createSchemas();
        break;
    }
  }

  private createInfraLayer() {
    switch (this.generationType) {
      case GenerationTypeEnum.businessOnly:
        this.infraLayerGenerator.createDataAccess();
        this.infraLayerGenerator.createRepo();
        break;
      default:
        this.infraLayerGenerator.createDataAccess();
        this.infraLayerGenerator.createModules();
        this.infraLayerGenerator.createRepo();
        break;
    }
  }

  private createDomainLayer() {
    switch (this.generationType) {
      case GenerationTypeEnum.businessOnly:
      case GenerationTypeEnum.metadata:
        this.domainLayerGenerator.createBusiness();
        this.domainLayerGenerator.createErrors();
        this.domainLayerGenerator.createModel();
        this.createBusinessOps();
        break;
      default:
        this.domainLayerGenerator.createBusiness();
        this.domainLayerGenerator.createErrors();
        this.domainLayerGenerator.createMappers();
        this.domainLayerGenerator.createModel();
        this.createBusinessOps();
        break;
    }
  }

  private createBusinessOps() {
    switch (this.generationType) {
      case GenerationTypeEnum.businessOnly:
        this.domainLayerGenerator.createExists();
        this.domainLayerGenerator.createFind();
        this.domainLayerGenerator.createFindAll();
        this.domainLayerGenerator.createFindMany();
        this.domainLayerGenerator.createInsert();
        this.domainLayerGenerator.createUpdate();
        this.domainLayerGenerator.createOperationsIndex();
        break;
      case GenerationTypeEnum.full:
        this.domainLayerGenerator.createDeleteHard();
        this.domainLayerGenerator.createDeleteManyHard();
        this.domainLayerGenerator.createDeleteManyShy();
        this.domainLayerGenerator.createDeleteManySoft();
        this.domainLayerGenerator.createDeleteShy();
        this.domainLayerGenerator.createDeleteSoft();
        this.domainLayerGenerator.createExists();
        this.domainLayerGenerator.createFind();
        this.domainLayerGenerator.createFindAll();
        this.domainLayerGenerator.createFindMany();
        this.domainLayerGenerator.createInsert();
        this.domainLayerGenerator.createInsertMany();
        this.domainLayerGenerator.createPurge();
        this.domainLayerGenerator.createSearch();
        this.domainLayerGenerator.createTruncate();
        this.domainLayerGenerator.createUpdate();
        this.domainLayerGenerator.createUpdateMany();
        this.domainLayerGenerator.createOperationsIndex();
        break;
      case GenerationTypeEnum.metadata:
        this.domainLayerGenerator.createFind();
        this.domainLayerGenerator.createFindMany();
        this.domainLayerGenerator.createInsert();
        this.domainLayerGenerator.createPurge();
        this.domainLayerGenerator.createTruncate();
        this.domainLayerGenerator.createOperationsIndex();
        break;
      case GenerationTypeEnum.simple:
        this.domainLayerGenerator.createExists();
        this.domainLayerGenerator.createFind();
        this.domainLayerGenerator.createFindMany();
        this.domainLayerGenerator.createInsert();
        this.domainLayerGenerator.createInsertMany();
        this.domainLayerGenerator.createPurge();
        this.domainLayerGenerator.createTruncate();
        this.domainLayerGenerator.createUpdate();
        this.domainLayerGenerator.createUpdateMany();
        this.domainLayerGenerator.createOperationsIndex();
        break;
      case GenerationTypeEnum.weakCatalog:
        this.domainLayerGenerator.createFindAll();
        this.domainLayerGenerator.createInsertMany();
        this.domainLayerGenerator.createTruncate();
        this.domainLayerGenerator.createOperationsIndex();
        break;
      default:
        console.log("Case not handled. Please take support on this.");
        break;
    }
  }

  private createGroupIndex() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain);

      this.fw.write({
        data: dictionaries.groupIndexDictionary(this.getProps()),
        fileName: fileStructure.index.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }
}

class ApiLayerGenerator extends GeneratorBase {
  constructor(args: GeneratorArgs) {
    super(args);
  }

  createApiFolder() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .api.$subGroup(this.camel.subdomain);

      this.fw.createFolder(fileStructure.path);
    } catch (error) {
      console.log({ error });
    }
  }

  createInterface() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .api.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.interfaceDictionary(this.getProps()),
        fileName: fileStructure.interface.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createRoutes() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .api.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.routesDictionary(this.getProps()),
        fileName: fileStructure.routes.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createSchemas() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .api.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.schemasDictionary(this.getProps()),
        fileName: fileStructure.schema.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }
}

class InfraLayerGenerator extends GeneratorBase {
  constructor(args: GeneratorArgs) {
    super(args);
  }

  createDataAccess() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain).infra.dataAccess;

      this.fw.write({
        data: dictionaries.dataAccessDictionary(this.getProps()),
        fileName: fileStructure.$child(this.camel.subdomain).file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createModules() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain).infra.modules;

      this.fw.write({
        data: dictionaries.modulesDictionary(this.getProps()),
        fileName: fileStructure.$child(this.camel.subdomain).file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createRepo() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain).infra.repos;

      this.fw.write({
        data: dictionaries.reposDictionary(this.getProps()),
        fileName: fileStructure.$child(this.camel.subdomain).file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }
}

class DomainLayerGenerator extends GeneratorBase {
  constructor(args: GeneratorArgs) {
    super(args);
  }

  createBusiness() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain).domain.business;

      this.fw.write({
        data: dictionaries.businessDictionary(this.getProps()),
        fileName: fileStructure.$child(this.camel.subdomain).file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createErrors() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain).domain.errors;

      this.fw.write({
        data: dictionaries.errorsDictionary(this.getProps()),
        fileName: fileStructure.$child(this.camel.subdomain).file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createMappers() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain).domain.mappers;

      this.fw.write({
        data: dictionaries.mappersDictionary(this.getProps()),
        fileName: fileStructure.$child(this.camel.subdomain).file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createModel() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain).domain.models;

      this.fw.write({
        data: dictionaries.modelsDictionary(this.getProps()),
        fileName: fileStructure.$child(this.camel.subdomain).file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createDeleteHard() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.deleteHardDictionary(this.getProps()),
        fileName: fileStructure.deleteHard.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createDeleteManyHard() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.deleteManyHardDictionary(this.getProps()),
        fileName: fileStructure.deleteManyHard.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createDeleteManyShy() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.deleteManyShyDictionary(this.getProps()),
        fileName: fileStructure.deleteManyShy.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createDeleteManySoft() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.deleteManySoftDictionary(this.getProps()),
        fileName: fileStructure.deleteManySoft.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createDeleteShy() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.deleteShyDictionary(this.getProps()),
        fileName: fileStructure.deleteShy.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createDeleteSoft() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.deleteSoftDictionary(this.getProps()),
        fileName: fileStructure.deleteSoft.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createExists() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.existsDictionary(this.getProps()),
        fileName: fileStructure.exists.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createFind() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.findDictionary(this.getProps()),
        fileName: fileStructure.find.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createFindAll() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.findAllDictionary(this.getProps()),
        fileName: fileStructure.findAll.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createFindMany() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.findManyDictionary(this.getProps()),
        fileName: fileStructure.findMany.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createInsert() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.insertDictionary(this.getProps()),
        fileName: fileStructure.insert.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createInsertMany() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.insertManyDictionary(this.getProps()),
        fileName: fileStructure.insertMany.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createPurge() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.purgeDictionary(this.getProps()),
        fileName: fileStructure.purge.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createSearch() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.searchDictionary(this.getProps()),
        fileName: fileStructure.search.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createTruncate() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.truncateDictionary(this.getProps()),
        fileName: fileStructure.truncate.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createUpdate() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.updateDictionary(this.getProps()),
        fileName: fileStructure.update.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createUpdateMany() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.updateManyDictionary(this.getProps()),
        fileName: fileStructure.updateMany.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  createOperationsIndex() {
    try {
      const fileStructure = structure.app
        .$version(this.version)
        .$group(this.camel.domain)
        .domain.business.$subGroup(this.camel.subdomain);

      this.fw.write({
        data: dictionaries.operationsIndexDictionary(this.getProps()),
        fileName: fileStructure.operationsIndex.file,
        path: fileStructure.path,
      });
    } catch (error) {
      console.log({ error });
    }
  }
}
