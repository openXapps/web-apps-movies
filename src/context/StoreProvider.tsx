import {
  createContext,
  useReducer,
  // useMemo, 
  // useState 
} from 'react';
import StoreReducer from './StoreReducer';
// import useContextWrapper from '@/hooks/useContextWrapper';

// https://medium.com/@nitinjha5121/mastering-react-context-with-typescript-a-comprehensive-tutorial-5bab5ef48a3b

// https://www.youtube.com/watch?v=05ZM4ymK9Nc

export type TStoreState = {
  route: number;
  routePage: number;
}

// Initialize context data
const initState: TStoreState = {
  route: 0,
  routePage: 1,
};

// type TStoreContextState = {
//   store: TStoreState;
//   setStore: React.Dispatch<React.SetStateAction<TStoreState>>;
// }

const StoreContext = createContext<TStoreState>(initState);

export function StoreContextProvider({ children }: React.PropsWithChildren<{}>): JSX.Element {
  const [storeState, storeDispatch] = useReducer(StoreReducer, initState);
  // const [store, setStore] = useState<TStoreContextState['store']>(initState);
  // const value = useMemo(() => ({ store, setStore }), [store]);

  return (
    // <StoreContext.Provider value={value.store}>{children}</StoreContext.Provider>
    <StoreContext.Provider value={[storeState, storeDispatch]}>{children}</StoreContext.Provider>
  );
}

// export function useStoreContext() {
//   useContextWrapper(StoreContext, {
//     contextName: useStoreContext.name,
//     providerName: StoreContextProvider.name,
//   })
// }