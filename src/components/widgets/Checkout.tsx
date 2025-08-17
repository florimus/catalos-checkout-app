'use client';

import React, { FC, useMemo } from 'react';

import Container from '../atoms/Container';
import OrderSummary from './OrderSummary';
import {
  Address,
  LineItem,
  PaymentOption,
  Price,
} from '@/lib/graphql/generated';
import Header from './Header';
import CheckoutSteps from './CheckoutSteps';
import { User } from '@/common/lib/types';

interface CheckoutPageProps {
  translation: Record<string, string>;
  price: Price;
  language: string;
  user: User | null;
  orderId?: string;
  orderEmail?: string | null;
  shippingAddress?: Address;
  billingAddress?: Address;
  lineItems?: LineItem[];
  paymentOptions?: PaymentOption[];
  selectedPaymentMethod?: PaymentOption;
}

const CheckoutPage: FC<CheckoutPageProps> = ({
  translation,
  lineItems,
  price,
  user,
  orderId,
  orderEmail,
  shippingAddress,
  billingAddress,
  language,
  paymentOptions,
  selectedPaymentMethod,
}) => {
  const checkoutStep = useMemo(() => {
    if (orderEmail && shippingAddress && billingAddress) {
      return 3;
    } else if (orderEmail) {
      return 2;
    } else {
      return 1;
    }
  }, [orderEmail, shippingAddress, billingAddress]);
  return (
    <Container>
      <Header language={language} />
      <div className='flex flex-col lg:flex-row gap-8'>
        <CheckoutSteps
          checkoutStep={checkoutStep}
          shippingAddress={shippingAddress}
          billingAddress={billingAddress}
          orderEmail={orderEmail}
          paymentOptions={paymentOptions}
          orderId={orderId}
          user={user}
          translation={translation}
          selectedPaymentMethodId={selectedPaymentMethod?.id || ''}
        />
        <OrderSummary
          orderId={orderId}
          translation={translation}
          selectedPaymentMethod={selectedPaymentMethod}
          lineItems={lineItems}
          price={price}
        />
      </div>
    </Container>
  );
};

export default CheckoutPage;
