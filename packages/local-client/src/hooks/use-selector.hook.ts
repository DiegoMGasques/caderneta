import {
  useSelector as untypedUseSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { RootState } from "../store";

export const useSelector: TypedUseSelectorHook<RootState> = untypedUseSelector;
