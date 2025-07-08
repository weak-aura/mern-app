import React from "react";
import {Toast, Toaster, useToasterStore} from "react-hot-toast";
import {Outlet} from "react-router-dom";
import {toast} from "react-hot-toast"
import {appUseDispatch, appUseSeletor} from "../../../redux/redux-hooks.ts";
import {setClearAuthMessages} from "../../../redux/features/slices/authSlice.ts";
import {HotToast} from "../../../components/HotToast";

export const Main = () => {
  const TOAST_LIMIT = 3;
  const dispatch = appUseDispatch();
  const {message: authMessage, error: authError} = appUseSeletor(state => state.authReducer)
  const {toasts} = useToasterStore();

  React.useEffect(() => {
    if (authMessage) {
      toast((el: Toast) => <HotToast onClick={() => toast.dismiss(el.id)}>{authMessage}</HotToast>)
      dispatch(setClearAuthMessages())
    } else if (authError) {
      toast((el: Toast) => <HotToast onClick={() => toast.dismiss(el.id)}>{authError}</HotToast>)
      dispatch(setClearAuthMessages())
    }
  }, [authMessage, authError])

  React.useEffect(() => {
    // Отфильтровываем только видимые тосты
    const visibleToasts = toasts.filter((t) => t.visible);

    // Если количество видимых тостов превышает лимит
    if (visibleToasts.length > TOAST_LIMIT) {
      // Итерируемся по тостам, которые превышают лимит, начиная с самых старых
      visibleToasts
        .filter((_, i) => i >= TOAST_LIMIT) // Выбираем тосты, индексы которых больше или равны лимиту
        .forEach((t) => toast.dismiss(t.id)); // Закрываем эти тосты
    }
  }, [toasts]);

  return (
    <div>
      <Outlet/>
      <Toaster toastOptions={{duration: 5000}} position="top-center"/>
    </div>
  );
};

