import { LineItem, Price } from '@/lib/graphql/generated';
import { t } from '@/utils/translationUtils';
import Image from 'next/image';
import { FC } from 'react';

interface OrderSummaryProps {
  translation: Record<string, string>;
  lineItems?: LineItem[];
  price?: Price;
}

const OrderSummary: FC<OrderSummaryProps> = ({
  translation,
  lineItems,
  price,
}) => {
  if (!lineItems || lineItems.length === 0) {
    return null;
  }

  return (
    <div className='lg:w-1/3'>
      <div className='bg-card rounded-lg p-6 shadow-sm border border-gray-100 sticky top-4'>
        <h2 className='font-heading mb-8 text-2xl text-gray-600 font-semibold'>
          {translation.order_summary_title}
        </h2>

        <div className='space-y-4 mb-6'>
          {lineItems.map(({ id, product, quantity, itemPrice, variant }) => (
            <div
              key={`key_${id}_${quantity}_${itemPrice?.finalPrice}`}
              className='flex items-center gap-4'
            >
              <Image
                src={variant?.medias?.[0]?.defaultSrc || ''}
                alt={product?.name || ''}
                width={64}
                height={64}
                className='w-24 h-24 object-cover rounded border border-gray-200 p-1'
              />
              <div className='flex-1'>
                <h3 className='font-medium text-gray-600'>
                  {t('name', product?.name, product?.translations)}
                </h3>
                <p className='text-sm text-gray-500'>
                  {translation?.quantity}: {quantity}
                </p>
              </div>
              <p className='font-medium'>
                {translation.currency} {itemPrice?.finalPrice}{' '}
              </p>
            </div>
          ))}
        </div>

        <div className='space-y-2 border-t border-border pt-4'>
          <div className='flex justify-between'>
            <span>{translation?.subtotalPrice}</span>
            <span>
              {translation.currency} {price?.subtotalPrice}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>{translation?.shippingPrice}</span>
            <span>
              {price?.shippingPrice ? `${translation.currency}  ${price.shippingPrice}` : translation?.free_label}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>{translation?.totalTaxPrice}</span>
            <span>
              {price?.totalTaxPrice ? `${translation.currency}  ${price.totalTaxPrice}` : translation?.free_label}
            </span>
          </div>
          <div className='flex justify-between font-bold pt-2 border-t border-border'>
            <span>{translation?.grandTotalPrice}</span>
            <span>
              {translation.currency} {price?.grandTotalPrice}
            </span>
          </div>
        </div>

        <button className='w-full mt-6 bg-black text-amber-50 py-3 rounded-sm font-medium cursor-pointer'>
          {translation?.completeOrder}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
