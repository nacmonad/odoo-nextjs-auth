import './globals.css'

import { IronSessionProvider } from '@/contexts/IronSessionProvider';
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session';

import sessionConfig from '@/utils/session';
import { Providers as ClientProviders } from './providers'
import { ReactElement } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: ReactElement,
}) {

  const session = await getIronSession(cookies(), sessionConfig);
  const odoo = session?.odoo ? session.odoo : null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <IronSessionProvider session={ odoo ? session : null}>
          <ClientProviders>{children}</ClientProviders>
        </IronSessionProvider>
      </body>
    </html>
    
  )
}
