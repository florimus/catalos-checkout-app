import { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import { FaShippingFast, FaUser } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { User } from '@/common/lib/types';
import { TbHeartHandshake } from 'react-icons/tb';
import ShippingAndBillingAddress from './ShippingAndBillingAddress';
import { Address, PaymentOption } from '@/lib/graphql/generated';
import PaymentOptionComponent from './PaymentOption';

interface Step {
  id: number;
  title: string | React.ReactNode;
  content: React.ReactNode;
}

interface CheckoutStepsProps {
  user: User | null;
  checkoutStep: number;
  orderId?: string;
  orderEmail?: string | null;
  paymentOptions?: PaymentOption[];
  shippingAddress?: Address;
  billingAddress?: Address;
  translation: Record<string, string>;
  selectedPaymentMethodId?: string;
}

export default function CheckoutSteps({
  user,
  translation,
  orderEmail,
  orderId,
  checkoutStep,
  shippingAddress,
  billingAddress,
  paymentOptions,
  selectedPaymentMethodId,
}: CheckoutStepsProps) {
  const [openStep, setOpenStep] = useState<number>(checkoutStep);

  const handleContinue = (id: number) => {
    if (id < steps.length) {
      setOpenStep(id + 1);
    }
  };

  const steps: Step[] = [
    {
      id: 1,
      title: (
        <div className='flex items-center'>
          <FaUser className='text-primary mx-2' />
          <h2 className='text-heading font-heading'>
            {translation.personalInfo}
          </h2>
        </div>
      ),
      content: (
        <PersonalInfo
          orderEmail={orderEmail}
          translation={translation}
          orderId={orderId}
          user={user}
          nextStep={() => handleContinue(1)}
        />
      ),
    },
    {
      id: 2,
      title: (
        <div className='flex items-center'>
          <FaShippingFast className='text-primary mx-2' />
          <h2 className='text-heading font-heading'>
            {translation.shippingAndBillingAddress}
          </h2>
        </div>
      ),
      content: (
        <ShippingAndBillingAddress
          shippingAddress={shippingAddress}
          billingAddress={billingAddress}
          orderId={orderId}
          translation={translation}
          nextStep={() => handleContinue(2)}
        />
      ),
    },
    {
      id: 3,
      title: (
        <div className='flex items-center'>
          <TbHeartHandshake className='text-primary mx-2' />
          <h2 className='text-heading font-heading'>
            {translation.paymentOptions}
          </h2>
        </div>
      ),
      content: (
        <PaymentOptionComponent
          orderId={orderId}
          selectedPaymentMethodId={selectedPaymentMethodId}
          paymentOptions={paymentOptions}
        />
      ),
    },
  ];

  return (
    <div className='flex-1 mt-6'>
      <div className='flex justify-between mb-4'>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex-1 h-2 mx-1 rounded ${
              step.id <= openStep ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className='space-y-3'>
        {steps.map((step) => (
          <div
            key={step.id}
            className='border border-gray-200 rounded-md overflow-hidden'
          >
            <button
              onClick={() => setOpenStep(step.id)}
              className={`w-full text-left px-4 py-3 font-medium flex justify-between items-center ${
                openStep === step.id
                  ? 'bg-blue-50'
                  : 'bg-gray-50 cursor-pointer'
              }`}
            >
              {step.title}
              <span>
                {openStep === step.id ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowForward />
                )}
              </span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                openStep === step.id ? '' : 'hidden'
              }`}
            >
              <div className='p-4 border-t border-gray-200 bg-white'>
                {step.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
