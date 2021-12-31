import { produce } from "immer";
import { Action } from "../actions";
import { ActionTypes } from "../types";

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionTypes.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          error: "",
        };
        return state;
      case ActionTypes.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          ...action.payload.bundle,
          loading: false,
        };
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
