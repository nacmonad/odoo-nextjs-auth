'use client'
// path-to-iron-session-provider.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { IronSessionWithOdoo } from '@/types/index';

interface IronSessionContextProps {
  session: IronSessionWithOdoo;
}

const IronSessionContext = createContext<IronSessionContextProps | undefined>(undefined);

interface IronSessionProviderProps {
  session: IronSessionWithOdoo;
  children: ReactNode;
}

export const IronSessionProvider: React.FC<IronSessionProviderProps> = ({ session, children }) => {
  return (
    <IronSessionContext.Provider value={{ session }}>
      {children}
    </IronSessionContext.Provider>
  );
};

export const useIronSession = (): IronSessionWithOdoo => {
  const context = useContext(IronSessionContext);
  if (!context) {
    throw new Error('useIronSession must be used within an IronSessionProvider');
  }
  return context.session;
};
