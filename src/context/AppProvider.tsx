import { createContext, useReducer } from "react";
import { initAppContextState } from "@/lib/data";
import { AppContextType } from "@/lib/types";
import AppReducer from "./AppReducer";

// https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm

type AppProviderProps = {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextType>({
  appState: initAppContextState,
  appDispatch: () => { },
});

export const AppProvider = ({ children }: AppProviderProps) => {
  const [appState, appDispatch] = useReducer(AppReducer, initAppContextState);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  )
}



