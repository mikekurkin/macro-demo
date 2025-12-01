import { config } from '@/lib/config';
import type { CodegenConfig } from '@graphql-codegen/cli';

const codegen: CodegenConfig = {
  schema: config.graphqlEndpoint,
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

export default codegen;
