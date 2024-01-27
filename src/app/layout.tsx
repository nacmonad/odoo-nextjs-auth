import './globals.css'

import { IronSessionProvider } from '@/contexts/IronSessionProvider';
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session';

import sessionConfig from '@/utils/session';
import { Providers as ClientProviders } from './providers'
import { ReactElement } from 'react';
import { IronSessionWithOdoo } from '@/types/index';

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: ReactElement,
}) {

  const session : IronSessionWithOdoo = await getIronSession(cookies() as any, sessionConfig);
  const sessionForClient = JSON.parse(JSON.stringify(session));

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />

      </head>
      <body className={inter.className}>
        <IronSessionProvider session={ sessionForClient }>
          <ClientProviders>{children}</ClientProviders>
        </IronSessionProvider>
      </body>
    </html>
    
  )
}
