import React from 'react';
import styles from "./Register.module.scss";
import {Link} from "react-router-dom";
import {setCurrentPathname} from "../../../../redux/features/slices/navigationSlice.ts";
import {setUserForm} from "../../../../redux/features/slices/authSlice.ts";
import {
  registerAsyncThunk,
  resendCodeAsyncThunk,
  verificationAsyncThunk
} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {Button} from "../../../../components/ButtonSkins/Button";
import {LuEye} from "react-icons/lu";
import {LuEyeClosed} from "react-icons/lu";
import {Spinner} from "../../../../components/Spinner";

import Cookies from "js-cookie";

export const Register = () => {
  const dispatch = appUseDispatch();
  const {
    loading: authLoading,
    userForm: authUserForm,
  } = appUseSeletor(state => state.authReducer);
  const [showPassword, setShowPassword] = React.useState(false)
  const [password, setPassword] = React.useState<string | undefined>("")

  const emailRef = React.useRef<HTMLInputElement | null>(null)
  const usernameRef = React.useRef<HTMLInputElement | null>(null)
  const newUserCache = Cookies.get("new_user_cookie")

  React.useEffect(() => {
    if (newUserCache === "new_user_cache") {
      if (emailRef.current && authUserForm?.email) {
        emailRef.current.value = authUserForm.email;
      }
      if (usernameRef.current && authUserForm?.username) {
        usernameRef.current.value = authUserForm.username;
      }
      if (password === "") {
        setPassword(authUserForm?.password)
      }
    }
    else {
      if (emailRef.current) {
        emailRef.current.value = "";
      }
      if (usernameRef.current) {
        usernameRef.current.value = "";
      }
      if (password) {
        setPassword("")
      }
    }
  }, [newUserCache]);

  const handleSubmit = () => {
    const user = {
      email: emailRef.current?.value,
      username: usernameRef.current?.value,
      password: password,
    }
    if (authLoading !== "pending") {
      dispatch(registerAsyncThunk(user))
      dispatch(setUserForm(user))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handleAuthFormPage = (pathname: string) => {
    dispatch(setCurrentPathname(pathname))
  }
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <div className={styles.space}>
          <h1 className={styles.title}>Регистрация</h1>

          <form className={styles.form}
          >

            {/*-------------------------------------------------------------------------------------------------Email*/}
            <div>
              <label className={styles.label}>Введите почту</label>
              <input type="email"
                     disabled={newUserCache === "new_user_cache"}
                     className={newUserCache === "new_user_cache" ? styles.form_submitted : styles.input}
                     placeholder="mernapp@gmail.com"
                     ref={emailRef}
              />
            </div>

            {/*----------------------------------------------------------------------------------------------Username*/}
            <div>
              <label className={styles.label}>Введите имя</label>
              <input type="text"
                     disabled={newUserCache === "new_user_cache"}
                     className={newUserCache === "new_user_cache" ? styles.form_submitted : styles.input}
                     ref={usernameRef}
              />
            </div>

            {/*----------------------------------------------------------------------------------------------Password*/}
            <div>
              <label className={styles.label}>Пароль</label>
              <div className={"relative"}>
                <input type={showPassword ? "text" : "password"}
                       placeholder="Введите свой пароль"
                       disabled={newUserCache === "new_user_cache"}
                       className={`${newUserCache === "new_user_cache" ? styles.form_submitted : styles.input} hide-password-reveal`}
                       value={password}
                       onChange={handlePasswordChange}
                />
                {!showPassword ? (
                  <LuEyeClosed className={`${styles.eye_icon} ${password?.length === 0 ? "hidden" : "block"}`}
                               onClick={handleTogglePasswordVisibility}
                  />
                ) : (
                  <LuEye className={`${styles.eye_icon} ${password?.length === 0 ? "hidden" : "block"}`}
                         onClick={handleTogglePasswordVisibility}
                  />
                )}
              </div>
            </div>

            {/*-------------------------------------------------------------------------------Link to Recover Password*/}
            <div className="flex justify-end">
              <Link to={"/profile/recover-password"}
                    className={styles.forgot_password}
                    onClick={() => handleAuthFormPage("recover-password")}
              >Забыли пароль?
              </Link>
            </div>

            {/*-----------------------------------------------------------------------------------Подтверждение почты*/}
            {newUserCache === "new_user_cache" && (<Verification/>)}
            {/*------------------------------------------------------------------------------------------------Submit*/}
            {newUserCache !== "new_user_cache" && (
              <Button type="button"
                      className={styles.btn}
                      disabled={authLoading === "pending"}
                      onClick={handleSubmit}
              >{authLoading === "pending" ? (
                <div className={"flex gap-2 justify-center items-center"}>Загрузка...<Spinner/></div>) : (
                <p>Отправить</p>)}
              </Button>
            )}
            {/*-----------------------------------------------------------------------------------------Link to Login*/}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              У вас есть аккаунт?
              <Link to={"/profile/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => handleAuthFormPage("login")}
              > Войти
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};


export const Verification = () => {
  const dispatch = appUseDispatch();
  const codeRef = React.useRef<HTMLInputElement | null>(null)
  const {
    loading: authLoading,
  } = appUseSeletor(state => state.authReducer)

  const handleSubmit = () => {
    const code = {verifyCode: codeRef.current?.value}
    dispatch(verificationAsyncThunk(code))
  }

  const handleResendEmailCode = () => {
    dispatch(resendCodeAsyncThunk())
  }

  return (
    <div>
      <label className={styles.label}>Введите код из почты</label>
      <input className={styles.input}
             ref={codeRef}
      />
      <div className={"flex gap-4 justify-end mt-2"}>
        <Button type={"button"}
                disabled={authLoading === "pending"}
                className={"flex items-center"}
                onClick={handleResendEmailCode}
        >
          {authLoading === "pending" ? (
            <div className={"w-[200px] flex gap-2 justify-center items-center"}
            >
              <span>Загрузка...</span>
              <Spinner/>
            </div>
          ) : (
            <p className={"w-[200px]"}>Отправить код повторно</p>)}
        </Button>
        <Button type="button"
                onClick={handleSubmit}
        >Подтвердить</Button>
      </div>
    </div>
  )
}

