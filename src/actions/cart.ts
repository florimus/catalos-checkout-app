'use server';

import { graphqlFetch } from '@/lib/graphql-client';
import { GetCartDocument, GetCartQuery } from '@/lib/graphql/generated';

export async function getCart(id: string) {
  console.log('getCart', id);
  
  return graphqlFetch<GetCartQuery>(GetCartDocument, {
    id,
  });
}
