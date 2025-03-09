import React from "react";
import {Button} from "../../../../components/buttons/Button";
import {Link, useNavigate} from "react-router-dom";
import styles from "./Login.module.scss";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {getMeAsyncThunk, loginAsyncThunk} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {Spinner} from "../../../../components/Spinner";
import {toast} from "react-hot-toast"

export const Login = () => {
  const navigate = useNavigate();
  const emailRef = React.useRef<HTMLInputElement | null>(null)
  const passwordRef = React.useRef<HTMLInputElement | null>(null)
  const {
    loading: authLoading,
    status: authStatus,
    message:authMessage,
    error:authError,
    cookie: authCookie
  } = appUseSeletor(state => state.authReducer)
  const dispatch = appUseDispatch();

  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value
    }
    dispatch(loginAsyncThunk(user))
    setIsFormSubmitted(true);
  }
  
  React.useEffect(() => {
    if (authStatus === "login") {
      navigate("/")
    }
  }, [authStatus])

  React.useEffect(() => {
    if (authLoading === "fulfilled" && authError && isFormSubmitted) {
      toast.error(authError);
      setIsFormSubmitted(false);
    } else if (authLoading === "fulfilled" && authMessage && isFormSubmitted) {
      toast.success(authMessage)
      setIsFormSubmitted(false)
    }
  }, [authLoading, authError, authMessage, isFormSubmitted]);
  
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
    <div className="w-full h-[100vh] flex items-center ">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Вход в систему</h1>
        <div className={styles.entry_area}>
          <label htmlFor="email" className={styles.label}>Введите почту</label>
          <input ref={emailRef} type="email" id="email" className={styles.input} placeholder="example@gmail.com"
                 required/>
        </div>
        <div className={styles.entry_area}>
          <label className={styles.label}>Пароль</label>
          <input ref={passwordRef} type="password" className={styles.input} required/>
        </div>
        <Button className={`w-full ${authLoading === "pending" ? "pointer-events-none cursor-default" : ""}`} type={"submit"}>{authLoading === "pending" ? <Spinner/> : "Войти"}</Button>

        <div className="flex justify-center">
          <Link to={"/recover_password"} type="button" className={`${styles.additional_link}`}>Забыли пароль?</Link>
        </div>
        <div className="flex justify-center">
          <Link to={"/register"} className={`${styles.additional_link}`}>Создать
            аккаунт?</Link>
        </div>
      </form>
    </div>
  );
};








