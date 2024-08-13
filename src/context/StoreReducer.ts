import { StoreContextType } from "./StoreProvider";

export type StoreReducerAction<T> = {
  type: 'ROUTE' | 'PAGE';
  payload?: T;
}

/**
 * Reducer function to mutate store state
 * @param {any} state Current state
 * @param {any} action Reducer action type and payload
 */
export default function StoreReducer<T>(state: StoreContextType, action: StoreReducerAction<T>) {
  // console.log('reducer: action type......', action.type);
  // console.log('reducer: action payload...', action.payload);
  switch (action.type) {
    case 'ROUTE':
      return {
        ...state,
        route: action.payload,
      };
    case 'PAGE':
      return {
        ...state,
        routePage: action.payload,
      };
  };
}
