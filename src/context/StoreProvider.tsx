import { createContext, useReducer } from 'react';

import StoreReducer from './StoreReducer';

export type StoreContextType = {
  route: number;
  routePage: number;
}

// Initialize context data
const contextData: StoreContextType = {
  route: 0,
  routePage: 1
};

export const context: React.Context<StoreContextType> = createContext<StoreContextType>(contextData);

/**
 * Context store wrapper for entire app used in index.js
 * @param {any} props Child components to be wrapped
 * @returns Returns a React Context Provider
 */
export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(StoreReducer, contextData);
  return (
    <context.Provider value={[state, dispatch]}>
      {props.children}
    </context.Provider>
  );
};
