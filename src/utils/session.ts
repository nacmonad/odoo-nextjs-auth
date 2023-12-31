// utils/session.ts
import { IronSessionConfig } from '@/types';

const sessionConfig: IronSessionConfig = {
  cookieName: 'the_trading_post',
  password: 'n8usE4r47zEmvPyu6tPeTBf1uBUzLJFL', // Make sure to use a strong, unique password
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  //store
};

export default sessionConfig;
