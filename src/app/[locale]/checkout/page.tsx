// import { getCart } from '@/actions/cart';
import { getCart } from '@/actions/cart';
import { PageContext } from '@/common/lib/types';
import Checkout from '@/components/widgets/Checkout';
import { COOKIE_KEYS } from '@/core/constants';
import { LineItem, Price } from '@/lib/graphql/generated';
import { pageTypes } from '@/utils/constants';
import { getCookie } from '@/utils/cookieUtils';
import { handleServerProps } from '@/utils/serverUtils';

const CheckoutPage = handleServerProps(async ({ translation }: PageContext) => {
  const orderId = await getCookie(COOKIE_KEYS.ORDER_ID);

  const { getCart: cartResponse } = (await getCart(orderId || '')) || {};

  return (
    <Checkout
      translation={translation}
      lineItems={cartResponse?.lineItems as LineItem[]}
      price={cartResponse?.price as Price}
    />
  );
}, pageTypes.CHECKOUT_PAGE);

export default CheckoutPage;
