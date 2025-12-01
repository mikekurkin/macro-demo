/// <reference types="vite/client" />

import type { CodegenConfig } from '@graphql-codegen/cli';

export const endpoint = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:8000/graphql/';

const config: CodegenConfig = {
  schema: endpoint,
  overwrite: true,
  documents: ['./src/lib/graphql/{queries,mutations}.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/lib/graphql/codegen/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
