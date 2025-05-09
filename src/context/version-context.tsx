'use client';

import type { Dispatch, ReactNode, SetStateAction} from 'react';
import { createContext, useContext, useState } from 'react';

type Version = 'v1' | 'v2';

interface VersionContextType {
  version: Version;
  setVersion: Dispatch<SetStateAction<Version>>;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<Version>('v1');

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion(): VersionContextType {
  const context = useContext(VersionContext);
  if (context === undefined) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
}
