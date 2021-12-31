import { ActionTypes } from "../types";
import { Action } from "../actions";
import { Cell } from "../cell";
import produce from "immer";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionTypes.FETCH_CELLS:
        state.loading = true;
        state.error = null;
        return state;
      case ActionTypes.FETCH_CELLS_COMPLETE:
        state.order = action.payload.map((cell) => cell.id);
        state.data = action.payload.reduce<CellsState["data"]>((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {});
        return state;
      case ActionTypes.FETCH_CELLS_ERROR:
        state.error = action.payload;
        state.loading = false;
        return state;
      case ActionTypes.SAVE_CELLS_ERROR:
        state.error = action.payload;
        return state;
      case ActionTypes.MOVE_CELL:
        const currIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        const targetIndex =
          action.payload.direction === "up" ? currIndex - 1 : currIndex + 1;

        if (targetIndex >= 0 && targetIndex <= state.order.length - 1) {
          state.order[currIndex] = state.order[targetIndex];
          state.order[targetIndex] = action.payload.id;
        }

        return state;
      case ActionTypes.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionTypes.DELETE_CELL:
        delete state.data[action.payload.id];
        state.order = state.order.filter((id) => id !== action.payload.id);
        return state;
      case ActionTypes.INSERT_CELL_AFTER:
        const cell: Cell = {
          id: randomId(),
          type: action.payload.type,
          content: "",
        };

        state.data[cell.id] = cell;

        const index = state.order.findIndex((id) => id === action.payload.id);
        if (index < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(index + 1, 0, cell.id);
        }

        return state;
      default:
        return state;
    }
  }
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 6);
};

export default reducer;
