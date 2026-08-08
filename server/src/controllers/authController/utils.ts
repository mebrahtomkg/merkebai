import {
  AUTH_TOKEN_AGE,
  AUTH_TOKEN_COOKIE_NAME,
  IS_PRODUCTION,
} from '@/config/general';
import { createAuthToken } from '@/utils';
import { CookieOptions, Response } from 'express';

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: IS_PRODUCTION,
  sameSite: IS_PRODUCTION ? 'none' : 'lax',
};

export const setLogInCookie = (res: Response, userId: number) => {
  const token = createAuthToken(userId);

  res.cookie(AUTH_TOKEN_COOKIE_NAME, token, {
    ...baseCookieOptions,
    expires: new Date(Date.now() + AUTH_TOKEN_AGE),
  });
};

export const setLogOutCookie = (res: Response) => {
  res.clearCookie(AUTH_TOKEN_COOKIE_NAME, baseCookieOptions);
};
