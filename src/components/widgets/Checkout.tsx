'use client';

import React, { FC } from 'react';

import Container from '../atoms/Container';
import OrderSummary from './OrderSummary';
import { LineItem, Price } from '@/lib/graphql/generated';
import Header from './Header';
import CheckoutSteps from './CheckoutSteps';

interface CheckoutPageProps {
  translation: Record<string, string>;
  lineItems?: LineItem[];
  price: Price;
  language: string;
}

const CheckoutPage: FC<CheckoutPageProps> = ({
  translation,
  lineItems,
  price,
  language,
}) => {
  return (
    <Container>
      <Header language={language} />
      <div className='flex flex-col lg:flex-row gap-8'>
        <CheckoutSteps/>
        <OrderSummary
          translation={translation}
          lineItems={lineItems}
          price={price}
        />
      </div>
    </Container>
  );
};

export default CheckoutPage;
