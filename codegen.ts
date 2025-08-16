import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    process.env.NEXT_PUBLIC_API_URL || 'http://43.204.61.73:8071/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    './src/lib/graphql/generated.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable @typescript-eslint/no-explicit-any */',
          },
        },
        'typescript',
        'typescript-operations',
        'typed-document-node',
      ],
    },
  },
};

export default config;
