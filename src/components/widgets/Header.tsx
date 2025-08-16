// components/Header.tsx
import { LANGUAGES } from '@/utils/constants';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface HeaderProps {
  language: string;
}

const Header: FC<HeaderProps> = ({ language }) => {
  const [lang, setLang] = useState(language);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const handleLanguageChange = (language: {
    code: string;
    label: string;
    locale: string;
  }) => {
    setLang(language.code);
    setIsOpen(false);

    // Break into path segments
    let segments = pathname.split('/').filter(Boolean);
    segments = segments.filter((segment) => segment !== locale);
    segments.unshift(language.locale);

    router.push(`/${segments.join("/")}`);
  };

  return (
    <header className='w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center mb-6 border rounded-md border-gray-100'>
      {/* Logo */}
      <div className='flex items-center'>
        <img src='/logo.svg' alt='Logo' className='h-8 w-auto' />
      </div>

      {/* Language Switcher */}
      <div className='relative'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2'
        >
          {LANGUAGES.find((language) => language.code === lang)?.label}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-4 w-4 transform transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </button>

        {isOpen && (
          <ul className='absolute right-0 mt-2 w-40 rounded shadow-lg z-50'>
            {LANGUAGES.map((language) => (
              <li
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`px-4 py-2 cursor-pointer bg-white hover:bg-gray-100 ${
                  language.code === lang ? ' font-semibold' : ''
                }`}
              >
                {language.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
