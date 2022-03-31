const structure = {
  path: "src",
  app: {
    path: "src/app",
    $version: (ver: string) => {
      return {
        path: "src/app/${ver}",
        $group: (groupName: string) => {
          return {
            path: `src/app/${ver}/${groupName}`,
            api: {
              path: `src/app/${ver}/${groupName}/api`,
              $subGroup: (subGroupName: string) => {
                return {
                  path: `src/app/${ver}/${groupName}/api/${subGroupName}`,
                  controller: {
                    file: "controller.ts",
                  },
                  interface: {
                    file: "interface.ts",
                  },
                  routes: {
                    file: "routes.ts",
                  },
                  schema: {
                    file: "schema.ts",
                  },
                };
              },
            },
            domain: {
              path: `src/app/${ver}/${groupName}/domain`,
              business: {
                path: `src/app/${ver}/${groupName}/domain/business`,
                $child: (subGroupName: string) => {
                  return { file: `${subGroupName}.ts` };
                },
                $subGroup: (subGroupName: string) => {
                  return {
                    path: `src/app/${ver}/${groupName}/domain/business/${subGroupName}`,
                    deleteHard: {
                      file: "deleteHard.ts",
                    },
                    deleteShy: {
                      file: "deleteShy.ts",
                    },
                    deleteSoft: {
                      file: "deleteSoft.ts",
                    },
                    deleteManyHard: {
                      file: "deleteManyHard.ts",
                    },
                    deleteManyShy: {
                      file: "deleteManyShy.ts",
                    },
                    deleteManySoft: {
                      file: "deleteManySoft.ts",
                    },
                    exists: {
                      file: "exists.ts",
                    },
                    find: {
                      file: "find.ts",
                    },
                    findAll: {
                      file: "findAll.ts",
                    },
                    findMany: {
                      file: "findMany.ts",
                    },
                    insert: {
                      file: "insert.ts",
                    },
                    insertMany: {
                      file: "insertMany.ts",
                    },
                    purge: {
                      file: "purge.ts",
                    },
                    search: {
                      file: "search.ts",
                    },
                    truncate: {
                      file: "truncate.ts",
                    },
                    update: {
                      file: "update.ts",
                    },
                    updateMany: {
                      file: "updateMany.ts",
                    },
                    operationsIndex: {
                      file: "index.ts",
                    },
                  };
                },
              },
              errors: {
                path: `src/app/${ver}/${groupName}/domain/errors`,
                $child: (subGroupName: string) => {
                  return { file: `${subGroupName}.ts` };
                },
              },
              mappers: {
                path: `src/app/${ver}/${groupName}/domain/mappers`,
                $child: (subGroupName: string) => {
                  return { file: `${subGroupName}.ts` };
                },
              },
              models: {
                path: `src/app/${ver}/${groupName}/domain/models`,
                $child: (subGroupName: string) => {
                  return { file: `${subGroupName}.ts` };
                },
              },
            },
            infra: {
              path: `src/app/${ver}/${groupName}/infra`,
              dataAccess: {
                path: `src/app/${ver}/${groupName}/infra/dataAccess`,
                $child: (subGroupName: string) => {
                  return { file: `${subGroupName}.ts` };
                },
              },
              modules: {
                path: `src/app/${ver}/${groupName}/infra/modules`,
                $child: (subGroupName: string) => {
                  return { file: `${subGroupName}.ts` };
                },
              },
              repos: {
                path: `src/app/${ver}/${groupName}/infra/repos`,
                $child: (subGroupName: string) => {
                  return { file: `${subGroupName}.ts` };
                },
              },
            },
            index: {
              file: "_index.ts",
            },
          };
        },
      };
    },
  },
};

export { structure };
