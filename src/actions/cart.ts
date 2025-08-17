'use server';

import { graphqlFetch } from '@/lib/graphql-client';
import {
  Address,
  GetCartDocument,
  GetCartQuery,
  GetPaymentLinkDocument,
  GetPaymentLinkQuery,
  SelectPaymentMethodDocument,
  SelectPaymentMethodMutation,
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
    await updateAddressToCart(id, {...shippingAddress, addressType: 'Shipping'});
  }
  if (billingAddress) {
    await updateAddressToCart(id, {...billingAddress, addressType: 'Billing'});
  }
  revalidatePath('/checkout');
}

export async function updatePaymentMethod(id: string, optionId: string) {
  const response = await graphqlFetch<SelectPaymentMethodMutation>(
    SelectPaymentMethodDocument,
    {
      id,
      optionId,
    }
  );
  if (response?.selectPaymentMethod?.id) {
    revalidatePath('/checkout');
  }
}

export async function getPaymentLink(id: string) {
  const response = await graphqlFetch<GetPaymentLinkQuery>(
    GetPaymentLinkDocument,
    {
      id,
    }
  );
  if (response.getPaymentLink?.paymentLink) {
    return response.getPaymentLink;
  } else {
    console.error(response);
  }
  return null;
}
