import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

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
      <div className='bg-card rounded-lg p-6 mb-4 shadow-sm'>
        <div className='flex items-center mb-4'>
          <FaUser className='text-primary mr-2' />
          <h2 className='text-heading font-heading'>Personal Information</h2>
        </div>
        <div className='space-y-4'>
          <input
            type='text'
            placeholder='Full Name'
            className='w-full p-2 border border-input rounded-sm focus:ring-2 focus:ring-ring'
            value={formData.personalInfo.fullName}
            onChange={(e) =>
              handleInputChange('personalInfo', 'fullName', e.target.value)
            }
          />
          <input
            type='email'
            placeholder='Email'
            className='w-full p-2 border border-input rounded-sm focus:ring-2 focus:ring-ring'
            value={formData.personalInfo.email}
            onChange={(e) =>
              handleInputChange('personalInfo', 'email', e.target.value)
            }
          />
          <input
            type='tel'
            placeholder='Phone Number'
            className='w-full p-2 border border-input rounded-sm focus:ring-2 focus:ring-ring'
            value={formData.personalInfo.phone}
            onChange={(e) =>
              handleInputChange('personalInfo', 'phone', e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
