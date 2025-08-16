import { useState } from 'react';
import FloatingInput from '../atoms/FloatingInput';

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
    },
    shippingAddress: {
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    billingAddress: {
      sameAsShipping: true,
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    delivery: {
      method: '',
    },
    payment: {
      method: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
      cardholderName: '',
    },
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        [field]: value,
      },
    }));
  };

  return (
    <div className='flex-1'>
      <div className='space-y-4'>
        <input
          type='text'
          placeholder='Full Name'
          className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
          value={formData.personalInfo.fullName}
          onChange={(e) =>
            handleInputChange('personalInfo', 'fullName', e.target.value)
          }
        />
        <input
          type='email'
          placeholder='Email'
          className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
          value={formData.personalInfo.email}
          onChange={(e) =>
            handleInputChange('personalInfo', 'email', e.target.value)
          }
        />
        <input
          type='tel'
          placeholder='Phone Number'
          className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
          value={formData.personalInfo.phone}
          onChange={(e) =>
            handleInputChange('personalInfo', 'phone', e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
