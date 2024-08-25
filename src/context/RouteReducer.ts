import { RouteContextState, RouteReducerActions } from "@/lib/types";

/**
 * Reducer function to mutate store state
 * @param {RouteContextState} state Current state
 * @param {RouteReducerAction} action Reducer action type and payload
 */
export default function RouteReducer(state: RouteContextState, action: RouteReducerActions): RouteContextState {

  console.log('reducer: action......', action);

  switch (action.type) {
    case 'SET_ROUTE':
      return {
        ...state,
        routeId: action.payload,
      };
    case 'PAGE_INCREMENT':
      return {
        ...state,
        routePage: state.routePage + 1,
      };
    case 'PAGE_DECREMENT':
      return {
        ...state,
        routePage: state.routePage - 1,
      };
    default:
      return state;
  };
}
