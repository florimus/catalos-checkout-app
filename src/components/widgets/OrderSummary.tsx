'use client';

import { getPaymentLink } from '@/actions/cart';
import { LineItem, PaymentOption, Price } from '@/lib/graphql/generated';
import { t } from '@/utils/translationUtils';
import Image from 'next/image';
import { FC, useState } from 'react';

interface OrderSummaryProps {
  translation: Record<string, string>;
  lineItems?: LineItem[];
  orderId?: string;
  selectedPaymentMethod?: PaymentOption;
  price?: Price;
}

const OrderSummary: FC<OrderSummaryProps> = ({
  selectedPaymentMethod,
  translation,
  lineItems,
  orderId,
  price,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  if (!lineItems || lineItems.length === 0) {
    return null;
  }

  const handleOrderSubmit = async () => {
    if (!selectedPaymentMethod?.id || loading) return;
    if (selectedPaymentMethod?.isExternal) {
      setLoading(true);
      const response = await getPaymentLink(orderId!);
      setLoading(false);
      console.log('Payment Link Response:', response);
      
      if (response?.paymentLink) {
        window.open(response.paymentLink, "_blank");
      }
    }
  };

  return (
    <div className='lg:w-1/3'>
      <div className='bg-card rounded-lg p-6 shadow-sm border border-gray-100 sticky top-4'>
        <h2 className='font-heading mb-8 text-2xl text-gray-600 font-semibold'>
          {translation.order_summary_title}
        </h2>

        <div className='space-y-4 mb-6'>
          {lineItems.map(({ id, product, quantity, itemPrice, variant }) => (
            <div key={`key_${id}`} className='flex items-center gap-4'>
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
              {price?.shippingPrice
                ? `${translation.currency}  ${price.shippingPrice}`
                : translation?.free_label}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>{translation?.totalTaxPrice}</span>
            <span>
              {price?.totalTaxPrice
                ? `${translation.currency}  ${price.totalTaxPrice}`
                : translation?.free_label}
            </span>
          </div>
          <div className='flex justify-between font-bold pt-2 border-t border-border'>
            <span>{translation?.grandTotalPrice}</span>
            <span>
              {translation.currency} {price?.grandTotalPrice}
            </span>
          </div>
        </div>

        <button
          onClick={handleOrderSubmit}
          disabled={!selectedPaymentMethod?.id || loading}
          className={`w-full mt-6${
            selectedPaymentMethod?.id || loading ? ' bg-black' : 'bg-gray-500'
          } text-amber-50 py-3 rounded-sm font-medium cursor-pointer`}
        >
          {!loading ? (
            selectedPaymentMethod?.isExternal ? (
              translation?.completePayment
            ) : (
              translation?.completeOrder
            )
          ) : (
            <div className='flex items-center justify-center py-1'>
              <div
                className='flex gap-2 text-gray-600 dark:text-gray-300'
                role='status'
                aria-label='Loading'
              >
                <span className='sr-only'>Loading</span>
                <span className='h-3 w-3 rounded-full bg-current animate-bounce'></span>
                <span className='h-3 w-3 rounded-full bg-current animate-bounce'></span>
                <span className='h-3 w-3 rounded-full bg-current animate-bounce'></span>
              </div>
            </div>
          )}
        </button>

        <p className='text-sm text-gray-500 mt-4'>
          {translation?.securePayment}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
