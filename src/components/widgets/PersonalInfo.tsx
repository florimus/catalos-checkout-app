'use client';

import { updateEmailToCart } from '@/actions/cart';
import { loginUser } from '@/actions/user';
import { User } from '@/common/lib/types';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface PersonalInfoProps {
  user: User | null;
  translation: Record<string, string>;
  orderId?: string;
  orderEmail?: string | null;
  nextStep: () => void;
}

const PersonalInfo = ({
  user,
  orderId,
  translation,
  orderEmail,
  nextStep,
}: PersonalInfoProps) => {
  const [loginForm, setLoginForm] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const [guestEmail, setGuestEmail] = useState<string>(orderEmail || '');

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const response = await loginUser(loginForm.email, loginForm.password);
    if (response) {
      updateCartEmail(loginForm.email);
    }
  };

  const updateCartEmail = async (email: string) => {
    await updateEmailToCart(orderId!, email);
    nextStep();
  };

  return (
    <div className='flex-1'>
      {user ? (
        <div className='space-y-4'>
          <input
            type='text'
            placeholder='Full Name'
            className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
            value={user?.firstName + ' ' + user?.lastName}
            disabled
          />
          <input
            type='email'
            placeholder='Email'
            className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
            value={user?.email || ''}
            disabled
          />
          <div className='flex justify-end'>
            <button
              onClick={nextStep}
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
             {translation?.continueLabel}
            </button>
          </div>
        </div>
      ) : orderEmail ? (
        <div className='space-y-2'>
          <h2 className='text-center text-lg font-semibold md:text-left my-5'>
            {translation?.continueAsGuest}
          </h2>
          <div className='flex items-center'>
            <input
              type='email'
              placeholder={translation?.emailLabel}
              className='border border-input rounded-sm focus:ring-ring border-gray-300 p-2 flex-1'
              value={guestEmail}
              disabled
            />
          </div>
          <p className='text-gray-500'>{translation?.guestUserDescription}</p>
          <div className='flex justify-end'>
            <button
              onClick={nextStep}
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              {translation?.continueLabel}
            </button>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='space-y-2 flex flex-col'>
            <h2 className='text-lg font-semibold my-5'>
              {translation?.loginLabel}
            </h2>
            <input
              type='email'
              placeholder={translation?.emailLabel}
              name='email'
              className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
              value={loginForm?.email}
              onChange={handleLoginInputChange}
            />
            <input
              type='password'
              placeholder={translation?.passwordLabel}
              name='password'
              className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
              value={loginForm?.password}
              onChange={handleLoginInputChange}
            />
            <button
              onClick={handleLogin}
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'
            >
              {translation?.loginLabel}
            </button>
            <p className='text-gray-500'>{translation?.loginDescription}</p>
          </div>
          <div className='space-y-2'>
            <h2 className='text-center text-lg font-semibold md:text-left my-5'>
              {translation?.continueAsGuest}
            </h2>
            <div className='flex items-center'>
              <input
                type='email'
                placeholder={translation?.emailLabel}
                className='border border-input rounded-sm focus:ring-ring border-gray-300 p-2 flex-1'
                value={guestEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGuestEmail(e.target.value)
                }
              />
              <button
                onClick={() => updateCartEmail(guestEmail)}
                className='px-4 py-3 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'
              >
                <FaArrowRight />
              </button>
            </div>
            <p className='text-gray-500'>{translation?.guestUserDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
