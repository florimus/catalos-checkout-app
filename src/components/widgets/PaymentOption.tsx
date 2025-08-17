'use client';

import { updatePaymentMethod } from '@/actions/cart';
import { PaymentOption } from '@/lib/graphql/generated';
import { FC, useCallback, useState } from 'react';

interface PaymentOptionProps {
  orderId?: string;
  paymentOptions?: PaymentOption[];
  selectedPaymentMethodId?: string;
}
const PaymentOptionComponent: FC<PaymentOptionProps> = ({
  orderId,
  paymentOptions,
  selectedPaymentMethodId,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedPaymentMethodId || null
  );

  const handleSelectOption = useCallback(
    async (optionId: string) => {
      await updatePaymentMethod(orderId!, optionId);
      setSelectedOption(optionId);
    },
    [orderId]
  );

  return (
    <div className='flex-1'>
      <div className='space-y-4'>
        {Array.isArray(paymentOptions) &&
          paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`flex items-center border border-gray-300 rounded-lg p-4 py-0 cursor-pointer${
                selectedOption === option.id ? ' bg-blue-50' : ''
              }`}
              onClick={() => handleSelectOption(option.id!)}
            >
              <div
                className={`h-5 w-5 rounded-2xl border-2 border-gray-400${
                  selectedOption === option.id
                    ? ' border-4 border-gray-600'
                    : ''
                }`}
              ></div>
              <h5 className='text-sm my-5 mx-3'>{option.name}</h5>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PaymentOptionComponent;
