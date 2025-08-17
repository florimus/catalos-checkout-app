'use client';

import { updateCartAddresses } from '@/actions/cart';
import { Address } from '@/lib/graphql/generated';
import { FC, useState } from 'react';

interface AddressFormProps {
  translation: Record<string, string>;
  orderId?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  nextStep: () => void;
}

const ShippingAndBillingAddress: FC<AddressFormProps> = ({
  translation,
  orderId,
  nextStep,
  ...address
}) => {
  const [shippingAddress, setShippingAddress] = useState<Address | null>(
    address.shippingAddress || null
  );

  const [editShippingAddress, setEditShippingAddress] =
    useState<boolean>(false);
  const [editBillingAddress, setEditBillingAddress] = useState<boolean>(false);

  const [billingAddress, setBillingAddress] = useState<Address | null>(
    address.billingAddress || null
  );

  const [enableSameAddress, setEnableSameAddress] = useState<boolean>(true);
  const handleShippingAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = event.target;
    setShippingAddress((prevShippingAddress) => ({
      ...prevShippingAddress,
      [name]: event.target.value,
    }));
  };

  const handleBillingAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = event.target;
    setBillingAddress((prevBillingAddress) => ({
      ...prevBillingAddress,
      [name]: event.target.value,
    }));
  };

  const handleContinue = async () => {
    // ✅ Case 1: Already have billing & shipping and not editing → just continue
    if (
      address.billingAddress &&
      address.shippingAddress &&
      !editBillingAddress &&
      !editShippingAddress
    ) {
      return nextStep();
    }

    // ✅ Case 2: No addresses yet
    if (!address.billingAddress && !address.shippingAddress) {
      if (shippingAddress && (billingAddress || enableSameAddress)) {
        await updateCartAddresses(
          orderId!,
          shippingAddress,
          enableSameAddress ? shippingAddress : billingAddress!
        );
        return nextStep();
      }
      return alert('address not found');
    }

    // ✅ Case 3: Editing existing addresses
    if (address.billingAddress && address.shippingAddress) {
      // both being edited
      if (editBillingAddress && editShippingAddress) {
        return billingAddress && shippingAddress
          ? (updateCartAddresses(orderId!, shippingAddress, billingAddress),
            nextStep())
          : alert('billing and shipping address not found');
      }

      // only billing being edited
      if (editBillingAddress) {
        return billingAddress
          ? (updateCartAddresses(orderId!, undefined, billingAddress),
            nextStep())
          : alert('billing address not found');
      }

      // only shipping being edited
      if (editShippingAddress) {
        return shippingAddress
          ? (updateCartAddresses(orderId!, shippingAddress), nextStep())
          : alert('shipping address not found');
      }
    }
  };

  return (
    <div className='flex-1'>
      <div className='space-y-4'>
        <div className='flex justify-between'>
          <h2 className='text-lg font-semibold my-5'>
            {translation.shippingAddress}
          </h2>
          {address.shippingAddress && (
            <button
              className='text-primary underline cursor-pointer'
              onClick={() => setEditShippingAddress((prev) => !prev)}
            >
              {editShippingAddress
                ? translation.cancel_label
                : translation.edit_label}
            </button>
          )}
        </div>

        {address.shippingAddress && !editShippingAddress ? (
          <p>
            {address.shippingAddress.addressLine1}.{' '}
            {address.shippingAddress.addressLine2}
            <br />
            {address.shippingAddress.area}. {address.shippingAddress.city}
            <br />
            {address.shippingAddress.country}. {address.shippingAddress.state}
            <br />
            Phone: {address.shippingAddress.phone}
            <br />
            PIN Code: {address.shippingAddress.pinCode}
          </p>
        ) : (
          <>
            <input
              type='text'
              value={shippingAddress?.addressLine1 || ''}
              placeholder={translation.addressLine1}
              name='addressLine1'
              onChange={handleShippingAddressChange}
              className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
            />
            <input
              type='text'
              value={shippingAddress?.addressLine2 || ''}
              placeholder={translation.addressLine2}
              name='addressLine2'
              onChange={handleShippingAddressChange}
              className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
            />
            <div className='flex flex-col md:flex-row gap-4'>
              <input
                type='text'
                value={shippingAddress?.country || ''}
                placeholder={translation.country}
                name='country'
                onChange={handleShippingAddressChange}
                className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
              />
              <input
                type='text'
                value={shippingAddress?.state || ''}
                placeholder={translation.state}
                name='state'
                onChange={handleShippingAddressChange}
                className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
              />
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <input
                type='text'
                value={shippingAddress?.city || ''}
                placeholder={translation.city}
                name='city'
                onChange={handleShippingAddressChange}
                className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
              />
              <input
                type='text'
                value={shippingAddress?.area || ''}
                placeholder={translation.area}
                name='area'
                onChange={handleShippingAddressChange}
                className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
              />
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <input
                type='text'
                value={shippingAddress?.phone || ''}
                placeholder={translation.phone}
                name='phone'
                onChange={handleShippingAddressChange}
                className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
              />
              <input
                type='text'
                value={shippingAddress?.pinCode || ''}
                placeholder={translation.pinCode}
                name='pinCode'
                onChange={handleShippingAddressChange}
                className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
              />
            </div>
            {!address.shippingAddress && (
              <div className='flex flex-col md:flex-row gap-4'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={enableSameAddress}
                    name='phone'
                    onChange={(e) => setEnableSameAddress(e.target.checked)}
                    className='h-6 w-6'
                  />
                  <span className='mx-2'>
                    {translation.sameAsShippingAddress}
                  </span>
                </label>
              </div>
            )}
          </>
        )}
      </div>
      {(address.billingAddress || !enableSameAddress) && (
        <div className='space-y-4'>
          <div className='flex justify-between'>
            <h2 className='text-lg font-semibold my-5 mt-10'>
              {translation.billingAddress}
            </h2>
            {address.shippingAddress && (
              <button
                className='text-primary underline cursor-pointer'
                onClick={() => setEditBillingAddress((prev) => !prev)}
              >
                {editBillingAddress
                  ? translation.cancel_label
                  : translation.edit_label}
              </button>
            )}
          </div>
          {address.billingAddress && !editBillingAddress ? (
            <p>
              {address.billingAddress.addressLine1}.{' '}
              {address.billingAddress.addressLine2}
              <br />
              {address.billingAddress.area}. {address.billingAddress.city}
              <br />
              {address.billingAddress.country}. {address.billingAddress.state}
              <br />
              Phone: {address.billingAddress.phone}
              <br />
              PIN Code: {address.billingAddress.pinCode}
            </p>
          ) : (
            <>
              <input
                type='text'
                value={billingAddress?.addressLine1 || ''}
                placeholder={translation.addressLine1}
                name='addressLine1'
                onChange={handleBillingAddressChange}
                className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
              />
              <input
                type='text'
                value={billingAddress?.addressLine2 || ''}
                placeholder={translation.addressLine2}
                name='addressLine2'
                onChange={handleBillingAddressChange}
                className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
              />
              <div className='flex flex-col md:flex-row gap-4'>
                <input
                  type='text'
                  value={billingAddress?.country || ''}
                  placeholder={translation.country}
                  name='country'
                  onChange={handleBillingAddressChange}
                  className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
                />
                <input
                  type='text'
                  value={billingAddress?.state || ''}
                  placeholder={translation.state}
                  name='state'
                  onChange={handleBillingAddressChange}
                  className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
                />
              </div>
              <div className='flex flex-col md:flex-row gap-4'>
                <input
                  type='text'
                  value={billingAddress?.city || ''}
                  placeholder={translation.city}
                  name='city'
                  onChange={handleBillingAddressChange}
                  className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
                />
                <input
                  type='text'
                  value={billingAddress?.area || ''}
                  placeholder={translation.area}
                  name='area'
                  onChange={handleBillingAddressChange}
                  className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
                />
              </div>
              <div className='flex flex-col md:flex-row gap-4'>
                <input
                  type='text'
                  value={billingAddress?.phone || ''}
                  placeholder={translation.phone}
                  name='phone'
                  onChange={handleBillingAddressChange}
                  className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
                />
                <input
                  type='text'
                  value={billingAddress?.pinCode || ''}
                  placeholder={translation.pinCode}
                  name='pinCode'
                  onChange={handleBillingAddressChange}
                  className='w-full border border-input rounded-sm focus:ring-ring border-gray-300 p-2'
                />
              </div>
            </>
          )}
        </div>
      )}
      <div className='flex justify-end'>
        <button
          onClick={handleContinue}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'
        >
          {editShippingAddress || editBillingAddress
            ? translation.saveAndContinue
            : translation.continueLabel}
        </button>
      </div>
    </div>
  );
};

export default ShippingAndBillingAddress;
