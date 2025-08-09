'use client';

import React, { FC } from 'react';

import Container from '../atoms/Container';
import ProgressTracker from './ProgressTracker';
import PersonalInfo from './PersonalInfo';
import OrderSummary from './OrderSummary';
import { LineItem, Price } from '@/lib/graphql/generated';

interface CheckoutPageProps {
  translation: Record<string, string>,
  lineItems?: LineItem[],
  price: Price;
}

const CheckoutPage: FC<CheckoutPageProps> = ({ translation, lineItems, price }) => {
  return (
    <Container>
      <ProgressTracker currentStep={1} />
      <div className='flex flex-col lg:flex-row gap-8'>
        <PersonalInfo />
        <OrderSummary translation={translation} lineItems={lineItems} price={price} />
      </div>
    </Container>
  );
};

export default CheckoutPage;
