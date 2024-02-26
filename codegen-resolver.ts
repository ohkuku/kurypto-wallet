import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './graphql/schema/*.ts',
  generates: {
    './graphql/types/resolver-types/index.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
