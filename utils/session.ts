// utils/session.ts
import { IronSessionConfig } from 'next-iron-session';
import Redis from 'ioredis';

// const redis = new Redis({
//   host: process.env.REDIS_HOST || 'localhost', // Replace with your Redis host
//   port: process.env.REDIS_PORT || 6379, // Replace with your Redis port
//   password: process.env.REDIS_PASSWORD || '', // Replace with your Redis password
// });

// const store = new Store({
//   client: redis,
// });

const sessionConfig: IronSessionConfig = {
  cookieName: 'the_trading_post',
  password: 'n8usE4r47zEmvPyu6tPeTBf1uBUzLJFL', // Make sure to use a strong, unique password
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  //store
};

export default sessionConfig;
