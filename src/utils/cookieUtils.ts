'use server';

import { cookies } from 'next/headers';

export const setCookie = async (key: string, value: string) => {
  const cookiesKeeper = await cookies();
  cookiesKeeper.set(key, value);
};

export const getCookie = async (key: string) => {
  const cookiesKeeper = await cookies();
  return cookiesKeeper.get(key)?.value;
};
