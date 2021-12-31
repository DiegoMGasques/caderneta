import { Action } from "../actions";
import { Dispatch } from "redux";
import { ActionTypes } from "../types";
import { saveCells } from "../creators";
import { RootState } from "..";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => (action: Action) => {
    next(action);

    if (
      [
        ActionTypes.INSERT_CELL_AFTER,
        ActionTypes.DELETE_CELL,
        ActionTypes.MOVE_CELL,
        ActionTypes.UPDATE_CELL,
      ].includes(action.type)
    ) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        saveCells()(dispatch, getState);
      }, 1000);
    }
  };
};
