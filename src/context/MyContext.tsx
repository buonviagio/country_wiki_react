import React, { createContext, ReactNode, useState } from "react";

type MyContextProviderProps = {
  children: ReactNode;
};
type LanguageArrayContextType = {
  arrayOfLanguage: Set<string> | null;
  setArrayOfLanguage: (a: Set<string> | null) => void;
};
const contextInitValue = {
  arrayOfLanguage: null,
  setArrayOfLanguage: () => {
    throw new Error("context not initilized");
  },
};

export const MyContext =
  createContext<LanguageArrayContextType>(contextInitValue);

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  //console.log("children :>> ", children);
  const [arrayOfLanguage, setArrayOfLanguage] = useState<Set<string> | null>(
    null
  );

  return (
    <MyContext.Provider value={{ arrayOfLanguage, setArrayOfLanguage }}>
      {children}
    </MyContext.Provider>
  );
};
