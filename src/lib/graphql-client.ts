'use server';

import { print } from 'graphql';
import type { DocumentNode } from 'graphql';
import { getCookie } from '@/utils/cookieUtils';
import { COOKIE_KEYS } from '@/core/constants';

export async function graphqlFetch<TData, TVariables = Record<string, unknown>>(
  document: DocumentNode,
  variables?: TVariables
): Promise<TData> {
  const token = await getCookie(COOKIE_KEYS.TOKEN);
  const language = await getCookie(COOKIE_KEYS.LANGUAGE);

  const res = await fetch(
    process.env.GRAPHQL_ENDPOINT || 'http://43.204.61.73:8071/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'language': `${language}`,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        query: print(document),
        variables,
      }),
      cache: 'no-store',
    }
  );

  const json = await res.json();

  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
  }

  return json.data;
}
