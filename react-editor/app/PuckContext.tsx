'use client';
import React, { createContext, useContext, useState } from "react";

const PuckContext = createContext<any>(null);

export const PuckProvider = ({ children }: any) => {
    const [puckData, setPuckData] = useState<any>({});

    return (
        <PuckContext.Provider value={{ puckData, setPuckData }}>
            {children}
        </PuckContext.Provider>
    );
};

export const usePuck = () => useContext(PuckContext);