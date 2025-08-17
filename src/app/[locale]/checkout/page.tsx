import { getCart } from '@/actions/cart';
import { getUserInfo } from '@/actions/user';
import { PageContext, User } from '@/common/lib/types';
import Checkout from '@/components/widgets/Checkout';
import { COOKIE_KEYS } from '@/core/constants';
import {
  Address,
  LineItem,
  PaymentOption,
  Price,
} from '@/lib/graphql/generated';
import { pageTypes } from '@/utils/constants';
import { getCookie } from '@/utils/cookieUtils';
import { handleServerProps } from '@/utils/serverUtils';
import { redirect, RedirectType } from 'next/navigation';

const CheckoutPage = handleServerProps(async ({ translation, params }: PageContext) => {
  const orderId = await getCookie(COOKIE_KEYS.ORDER_ID);
  const token = await getCookie(COOKIE_KEYS.TOKEN);
  const language = await getCookie(COOKIE_KEYS.LANGUAGE);

  const locale = (await params)?.locale

  let user: User | null = null;

  const { getCart: cartResponse } = (await getCart(orderId || '')) || {};

  if (cartResponse?.status === "Submitted") {
    redirect(`/${locale}/success`, RedirectType.replace);
  }

  if (token) {
    const userResponse = await getUserInfo();
    if (userResponse?.me) {
      user = userResponse.me;
    }
  }

  return (
    <Checkout
      translation={translation}
      user={user}
      orderId={orderId}
      orderEmail={cartResponse?.email}
      shippingAddress={cartResponse?.shippingAddress as Address}
      billingAddress={cartResponse?.billingAddress as Address}
      lineItems={cartResponse?.lineItems as LineItem[]}
      paymentOptions={cartResponse?.paymentOptions as PaymentOption[]}
      selectedPaymentMethod={cartResponse?.paymentInfo?.mode as PaymentOption}
      price={cartResponse?.price as Price}
      language={language || 'EN'}
    />
  );
}, pageTypes.CHECKOUT_PAGE);

export default CheckoutPage;
