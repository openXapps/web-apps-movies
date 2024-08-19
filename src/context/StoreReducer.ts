import { TStoreState } from "./StoreProvider";

export type TStoreReducerAction = {
  type: 'ROUTE' | 'PAGE';
  payload: TStoreState;
}

/**
 * Reducer function to mutate store state
 * @param {TStoreState} state Current state
 * @param {TStoreReducerAction} action Reducer action type and payload
 */
export default function StoreReducer(state: TStoreState, action: TStoreReducerAction): TStoreState {
  console.log('reducer: action type......', action.type);
  console.log('reducer: action payload...', action.payload);
  switch (action.type) {
    case 'ROUTE':
      return {
        ...state,
        route: action.payload.route,
      };
    case 'PAGE':
      return {
        ...state,
        routePage: action.payload.routePage,
      };
  };
}
