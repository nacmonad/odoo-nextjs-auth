
import { cookies } from 'next/headers';
import {Link} from '@nextui-org/link';

import { getIronSession } from '../../node_modules/iron-session/dist/index.cjs';
import sessionConfig from '@/utils/session';
import InstallButton from './components/InstallButton';

export default async function Home() {
  const sessionCookies = cookies();
  const session = await getIronSession(sessionCookies, sessionConfig);
  const { odoo } = session;
  console.log("/home", odoo);
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold">Rewards App</h1>
      <Link href="/login" className="group rounded-lg border border-transparent mt-4 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" rel="noopener noreferrer">
          <h2 className="text-2xl font-semibold">
            Login{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="ml-2 max-w-[30ch] text-sm opacity-50">
            Log in to the app.
          </p>
        </Link>

        {odoo && <Link href="/dashboard" className="group rounded-lg border border-transparent my-4 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" rel="noopener noreferrer">
          <h2 className="text-2xl font-semibold">
            Dashboard{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="ml-2 max-w-[30ch] text-sm opacity-50">
            Access the app.
          </p>
        </Link>}
      <InstallButton/>
    </main>
  );
}
