import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './graphql/schema/*.ts',
  documents: './graphql/query/*.ts',
  generates: {
    'graphql/types/client-types/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
