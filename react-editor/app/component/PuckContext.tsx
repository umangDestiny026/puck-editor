import React, { createContext, useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PuckContext = createContext<any>(null);

export const PuckProvider = ({
  children,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const [
    puckData,
    setPuckData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] = useState<any>({});

  return (
    <PuckContext.Provider
      value={{
        puckData,
        setPuckData,
      }}
    >
      {children}
    </PuckContext.Provider>
  );
};

export const usePuck = () => {
  const ctx = useContext(PuckContext);
  // Return safe defaults if PuckProvider is not mounted (e.g. inside Puck editor preview)
  if (!ctx) {
    return {
      puckData: {},
      setPuckData: () => {},
    };
  }
  return ctx;
};
