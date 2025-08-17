'use server';

import { COOKIE_KEYS } from '@/core/constants';
import { graphqlFetch } from '@/lib/graphql-client';
import {
  LoginUserDocument,
  LoginUserQuery,
  UserInfoDocument,
  UserInfoQuery,
} from '@/lib/graphql/generated';
import { cookies } from 'next/headers';

export async function getUserInfo() {
  try {
    return graphqlFetch<UserInfoQuery>(UserInfoDocument);
  } catch {
    return null;
  }
}

export async function loginUser(email: string, password: string) {
  const cookiesKeeper = await cookies();
  try {
    const response = await graphqlFetch<LoginUserQuery>(LoginUserDocument, {
      email,
      password,
    });

    if (response?.loginUser?.accessToken) {
      cookiesKeeper.set(COOKIE_KEYS.TOKEN, response?.loginUser?.accessToken);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
