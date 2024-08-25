import { createContext, useReducer } from "react";
import { initRouteContextState } from "@/lib/data";
import RouteReducer from "./RouteReducer";
import { RouteContextType } from "@/lib/types";

// https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm

type RouteProviderProps = {
  children: React.ReactNode;
}

export const RouteContext = createContext<RouteContextType>({
  routeState: initRouteContextState,
  routeDispatch: () => { },
});

export const RouteProvider = ({ children }: RouteProviderProps) => {
  const [routeState, routeDispatch] = useReducer(RouteReducer, initRouteContextState);

  return (
    <RouteContext.Provider value={{ routeState, routeDispatch }}>
      {children}
    </RouteContext.Provider>
  )
}



