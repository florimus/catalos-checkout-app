'use server';

import { graphqlFetch } from '@/lib/graphql-client';
import {
  GetCartDocument,
  GetCartQuery,
  UpdateCartEmailDocument,
  UpdateCartEmailMutation,
} from '@/lib/graphql/generated';
import { revalidatePath } from 'next/cache';

export async function getCart(id: string) {
  return graphqlFetch<GetCartQuery>(GetCartDocument, {
    id,
  });
}

export async function updateEmailToCart(id: string, email: string) {
  const response = await graphqlFetch<UpdateCartEmailMutation>(
    UpdateCartEmailDocument,
    {
      id,
      email,
    }
  );
  if (response.updateEmail?.email) {
    revalidatePath('/checkout');
  }
}
