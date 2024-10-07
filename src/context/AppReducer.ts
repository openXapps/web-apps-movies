import { AppContextState, AppReducerActions } from "@/lib/types";

/**
 * Reducer function to mutate App state
 * @param {AppContextState} state Current state
 * @param {AppReducerActions} action Reducer action type and payload
 */
export default function AppReducer(state: AppContextState, action: AppReducerActions): AppContextState {

  // console.log('reducer: state.......', state);
  // console.log('reducer: action......', action);

  switch (action.type) {
    case 'SET_ROUTEID':
      return {
        ...state,
        routeId: action.payload,
      };
    case 'SET_PLACEHOLDER':
      return {
        ...state,
        placeholder: action.payload,
      };
    default:
      return state;
  };
}
