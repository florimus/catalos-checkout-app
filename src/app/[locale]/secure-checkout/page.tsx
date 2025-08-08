import { redirect, RedirectType } from 'next/navigation';

import { COOKIE_KEYS } from '@/core/constants';
import { getCookie } from '@/utils/cookieUtils';
import { pageTypes } from '@/utils/constants';
import { PageContext } from '@/common/lib/types';
import { handleServerProps } from '@/utils/serverUtils';

const SecureCheckout = handleServerProps(async ({ params, searchParams, translation }: PageContext) => {
  const orderId = await getCookie(COOKIE_KEYS.ORDER_ID);

  const locale = (await params)?.locale

  const awaitedSearchParams = await searchParams || {};
  const orderIdFromUrl = awaitedSearchParams.orderId

  if (orderId && orderId === orderIdFromUrl) {
    redirect(`/${locale}/checkout`, RedirectType.replace);
  }

  return <h1>{translation.title}</h1>;
}, pageTypes.INVALID_SECURE_CHECKOUT_PAGE);

export default SecureCheckout;
