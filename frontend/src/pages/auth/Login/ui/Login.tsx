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
    status,
    loading,
    message,
    error,
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
    if (status === "login") {
      navigate("/")
    }
  }, [status])

  React.useEffect(() => {
    if (loading === "fulfilled" && error && isFormSubmitted) {
      toast.error(error);
      setIsFormSubmitted(false);
    } else if (loading === "fulfilled" && message && isFormSubmitted) {
      toast.success(message)
      setIsFormSubmitted(false)
    }
  }, [loading, error, message, isFormSubmitted]);

  React.useEffect(() => {
    dispatch(getMeAsyncThunk())
  }, [])

  React.useEffect(() => {
    if (loading === "fulfilled" && status === "getme") {
      navigate("/")
    }
  }, [status])

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
        <div className={styles.submit_area}>
          <Button className="w-[72px]" type={"submit"}>{loading === "pending" ? <Spinner/> : "Войти"}</Button>
          <Link to={"/register"} className={styles.link_route}>Создать
            аккаунт?</Link>
        </div>
      </form>
    </div>
  );
};



