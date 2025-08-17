import 'dotenv/config'

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    process.env.API_URL!,
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
