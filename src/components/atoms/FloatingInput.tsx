import { FC, InputHTMLAttributes } from 'react';

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingInput: FC<FloatingInputProps> = ({ label, ...props }) => {
  return (
    <div className='relative w-full'>
      <input
        {...props}
        placeholder=' ' // this is important for peer-placeholder-shown
        className='peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-2 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
      />
      <label
        className='absolute left-3 top-2.5 text-gray-500 text-sm transition-all 
                   peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-500'
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
