import { Dispatch } from "redux";
import axios from "axios";
import { bundle } from "../../config/bundler";
import {
  Action,
  DeleteCellAction,
  Diretion,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from "../actions";
import { Cell, CellTypes } from "../cell";
import { ActionTypes } from "../types";
import { RootState } from "..";

export const moveCell = (id: string, direction: Diretion): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: {
      id,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const createBundle =
  (id: string, input: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: {
        cellId: id,
      },
    });
    const bundleOutput = await bundle(input);
    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId: id,
        bundle: bundleOutput,
      },
    });
  };

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionTypes.FETCH_CELLS });
  try {
    const { data }: { data: Cell[] } = await axios.get("/cells");
    dispatch({ type: ActionTypes.FETCH_CELLS_COMPLETE, payload: data });
  } catch (e: any) {
    dispatch({ type: ActionTypes.FETCH_CELLS_ERROR, payload: e.message });
  }
};

export const saveCells =
  () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells } = getState();
    const { data, order } = cells!;
    const cellsArr = order.map((id) => data[id]);
    try {
      await axios.post("/cells", { cellsArr });
    } catch (e: any) {
      dispatch({ type: ActionTypes.SAVE_CELLS_ERROR, payload: e.message });
    }
  };
