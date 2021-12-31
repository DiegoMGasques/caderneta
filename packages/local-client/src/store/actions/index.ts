import { Cell, CellTypes } from "../cell";
import { ActionTypes } from "../types";

export type Diretion = "up" | "down";

export interface MoveCellAction {
  type: ActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: Diretion;
  };
}

export interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL;
  payload: { id: string };
}

export interface InsertCellAfterAction {
  type: ActionTypes.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface BundleStartAction {
  type: ActionTypes.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionTypes.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export interface FetchCellsAction {
  type: ActionTypes.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
  type: ActionTypes.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

export interface FetchCellsErrorAction {
  type: ActionTypes.FETCH_CELLS_ERROR;
  payload: string;
}

export interface SaveCellsErrorAction {
  type: ActionTypes.SAVE_CELLS_ERROR;
  payload: string;
}

export type Action =
  | MoveCellAction
  | UpdateCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | BundleCompleteAction
  | BundleStartAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction;
