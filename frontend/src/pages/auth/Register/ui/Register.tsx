import React from 'react';
import {Button} from "../../../../components/buttons/Button";
import {Link, useNavigate} from "react-router-dom";
import styles from "./Register.module.scss";
import {Spinner} from "../../../../components/Spinner";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {getMeAsyncThunk, registerAsyncThunk} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {toast} from "react-hot-toast";

export const Register = () => {
  const emailRef = React.useRef<HTMLInputElement | null>(null)
  const usernameRef = React.useRef<HTMLInputElement | null>(null)
  const passwordRef = React.useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate();
  const dispatch = appUseDispatch();
  const {status, loading, message, error } = appUseSeletor(state => state.authReducer)
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = {
      email: emailRef?.current?.value,
      username: usernameRef?.current?.value,
      password: passwordRef?.current?.value
    }
    dispatch(registerAsyncThunk(user))
    setIsFormSubmitted(true)
  }

  React.useEffect(() => {
    if (isFormSubmitted && status === "register" && loading === "fulfilled") {
      // toast.success(message, {duration: 6000})
      navigate("/verification")
      setIsFormSubmitted(false)
    }
  }, [status, isFormSubmitted, loading]);

  React.useEffect(() => {
    if (loading === "fulfilled" && error && isFormSubmitted) {
      toast.error(error)
      setIsFormSubmitted(false)
    } else if (loading === "fulfilled" && message && isFormSubmitted) {
      toast.success(message)
      setIsFormSubmitted(false)
    }
  }, [loading])


  React.useEffect(() => {
    dispatch(getMeAsyncThunk())
  }, [])

  React.useEffect(() => {
    if (loading === "fulfilled" && status === "getme") {
      navigate("/")
    }
  }, [status])

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Регистрация</h1>
        <div className={styles.entry_area}>
          <label htmlFor="email" className={styles.label}>Введите почту</label>
          <input id="email" ref={emailRef} type="email" className={styles.input} placeholder="example@gmail.com"
                 required/>
        </div>
        <div className={styles.entry_area}>
          <label htmlFor="name" className={styles.label}>Имя пользователя</label>
          <input id="name" ref={usernameRef} type="text" className={styles.input} required/>
        </div>
        <div className={styles.entry_area}>
          <label className={styles.label}>Пароль</label>
          <input ref={passwordRef} type="password" className={styles.input} required/>
        </div>
        <div className={`${styles.submit_area} ${loading === "pending" ? "pointer-events-none cursor-default" : ""}`}>
          <Button type="submit" className="min-w-[92px]">{loading === "pending" ? (<Spinner/>) : (
            <h1>Создать</h1>)}</Button>
          <Link to={"/login"} className={styles.link_route}>Уже есть аккаунт?</Link>
        </div>
      </form>
    </div>
  );
};

