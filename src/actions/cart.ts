'use server';

import { graphqlFetch } from '@/lib/graphql-client';
import {
  Address,
  GetCartDocument,
  GetCartQuery,
  UpdateCartAddressDocument,
  UpdateCartAddressMutation,
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

async function updateAddressToCart(id: string, address: Partial<Address>) {
  await graphqlFetch<UpdateCartAddressMutation>(UpdateCartAddressDocument, {
    id,
    address,
  });
}

export async function updateCartAddresses(
  id: string,
  shippingAddress?: Partial<Address>,
  billingAddress?: Partial<Address>
) {
  if (shippingAddress) {
    await updateAddressToCart(id, shippingAddress);
  }
  if (billingAddress) {
    await updateAddressToCart(id, billingAddress);
  }
  revalidatePath('/checkout');
}
