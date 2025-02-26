import {useSelector, useDispatch, TypedUseSelectorHook} from "react-redux";
import {AppDispatch, RootState} from "./store.ts";

export const appUseDispatch = () => useDispatch<AppDispatch>()
export const appUseSeletor: TypedUseSelectorHook<RootState> = useSelector;
