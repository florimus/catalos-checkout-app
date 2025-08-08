import { getCart } from '@/actions/cart';
import { PageContext } from '@/common/lib/types';
import { COOKIE_KEYS } from '@/core/constants';
import { pageTypes } from '@/utils/constants';
import { getCookie } from '@/utils/cookieUtils';
import { handleServerProps } from '@/utils/serverUtils';

const CheckoutPage = handleServerProps(async ({ translation }: PageContext) => {
  const orderId = await getCookie(COOKIE_KEYS.ORDER_ID);

  const cartResponse = await getCart(orderId || '');

  console.log('cartResponse', cartResponse);

  return (
    <section>
      <h1>{translation.title}</h1>
      <p>{translation.description}</p>
    </section>
  );
}, pageTypes.INVALID_SECURE_CHECKOUT_PAGE);

export default CheckoutPage;
