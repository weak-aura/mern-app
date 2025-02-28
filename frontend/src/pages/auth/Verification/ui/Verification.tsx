import React from 'react';
import styles from "./Verification.module.scss";
import {Button} from "../../../../components/buttons/Button";
import {OutlineButton} from "../../../../components/buttons/OutlineButton";
import {Link, useNavigate} from "react-router-dom";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {
  getMeAsyncThunk,
  resendCodeAsyncThunk,
  verificationAsyncThunk
} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {toast} from "react-hot-toast";
import {Spinner} from "../../../../components/Spinner";

export const Verification = () => {
  const codeRef = React.useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate();
  const dispatch = appUseDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const {
    loading: authLoading,
    status: authStatus,
    message: authMessage,
    error: authError,
    cookie: authCookie,
    hook_pending
  } = appUseSeletor(state => state.authReducer)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = {verifyCode: codeRef?.current?.value}
    dispatch(verificationAsyncThunk(code))
    setIsFormSubmitted(true)
  }

  const handleResendCode = () => {
    dispatch(resendCodeAsyncThunk())
    setIsFormSubmitted(true)
  }

  React.useEffect(() => {
    if (authStatus === "verification" && authLoading === "fulfilled") {
      navigate("/login")
    }
  }, [authStatus, authLoading])

  React.useEffect(() => {
    if(authLoading === "fulfilled" && authError && isFormSubmitted) {
      toast.error(authError)
      setIsFormSubmitted(false)
    }else if (authLoading === "fulfilled" && authMessage && isFormSubmitted){
      toast.success(authMessage)
      setIsFormSubmitted(false)
    }
  }, [authLoading])

  React.useEffect(() => {
    if (authCookie !== "invalid_auth_cache") {
      dispatch(getMeAsyncThunk())
    }
  }, [])

  React.useEffect(() => {
    if (authLoading === "fulfilled" && authStatus === "getme") {
      navigate("/")
    }
  }, [authStatus])

  
  return (
    <div className="w-full h-[100vh] flex items-center">
      <form className={styles.form} onSubmit={e => handleSubmit(e)}>
        <h1 className={styles.title}>Верификация кода</h1>
        <div className={styles.entry_area}>
          <label className={styles.label}>Введите код из почты</label>
          <input ref={codeRef} type="text" className={styles.input} required/>
        </div>
        <div className="flex items-center justify-between gap-4 mb-5">
          <Button className="w-[117px]" type={"submit"}>{authLoading === "pending" && hook_pending === "verification" ? (<Spinner/>) : ("Подтвердить")}</Button>
          <Link to={"/register"}>
            <OutlineButton type={"button"}>Вернуться Назад</OutlineButton>
          </Link>
        </div>
        <div onClick={handleResendCode} className={authLoading === "pending"? "pointer-events-none cursor-default" : ""}>
          <Button type={"button"} className="w-[208px]">{authLoading === "pending" && hook_pending === "resendCode"? (<Spinner/>) : ("Отправить код повторно")}</Button>
        </div>
      </form>
    </div>
  );
};

