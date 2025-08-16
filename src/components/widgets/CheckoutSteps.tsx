import { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import { FaUser } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";


interface Step {
  id: number;
  title: string | React.ReactNode;
  content: React.ReactNode;
}

export default function CheckoutSteps() {
  const [openStep, setOpenStep] = useState<number>(1);

  const steps: Step[] = [
    {
      id: 1,
      title: (
        <div className='flex items-center'>
          <FaUser className='text-primary mr-2' />
          <h2 className='text-heading font-heading'>Personal Information</h2>
        </div>
      ),
      content: <PersonalInfo />,
    },
    {
      id: 2,
      title: 'Shipping & Billing Address',
      content: <div>Address form</div>,
    },
    { id: 3, title: 'Delivery Options', content: <div>Delivery choices</div> },
    { id: 4, title: 'Payment', content: <div>Payment form</div> },
  ];

  const handleContinue = (id: number) => {
    if (id < steps.length) {
      setOpenStep(id + 1);
    }
  };

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
          <div key={step.id} className='border border-gray-200 rounded-md overflow-hidden'>
            <button
              onClick={() => setOpenStep(step.id)}
              className={`w-full text-left px-4 py-3 font-medium flex justify-between items-center ${
                openStep === step.id
                  ? 'bg-blue-50'
                  : 'bg-gray-50 cursor-pointer'
              }`}
            >
              {step.title}
              <span>{openStep === step.id ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden`}
              style={{
                maxHeight: openStep === step.id ? '500px' : '0',
                opacity: openStep === step.id ? 1 : 0,
              }}
            >
              <div className='p-4 border-t border-gray-200 bg-white'>
                {step.content}
                {step.id < steps.length && (
                  <button
                    onClick={() => handleContinue(step.id)}
                    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
