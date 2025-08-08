'use server';

import { graphqlFetch } from '@/lib/graphql-client';
import { UserInfoDocument, UserInfoQuery } from '@/lib/graphql/generated';

export async function getUserInfo() {
  return graphqlFetch<UserInfoQuery>(UserInfoDocument);
}
