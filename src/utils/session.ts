// utils/session.ts
import { IronSessionConfig } from '@/types';

const sessionConfig: IronSessionConfig = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  //store
};

export default sessionConfig;
