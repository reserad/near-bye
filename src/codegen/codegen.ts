import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "src/**/*.gql",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: ["typescript-operations"],
    },
  },
};

export default config;
