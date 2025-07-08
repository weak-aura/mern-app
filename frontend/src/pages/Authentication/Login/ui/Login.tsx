import React from 'react';
import styles from "./Login.module.scss"
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {loginAsyncThunk} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {Link, useNavigate} from "react-router-dom";
import {setCurrentPathname} from "../../../../redux/features/slices/navigationSlice.ts";
import {Button} from "../../../../components/ButtonSkins/Button";

export const Login = () => {
  const dispatch = appUseDispatch();
  const navigate = useNavigate();
  const {status: authStatus} = appUseSeletor(state => state.authReducer);
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value
    }
    dispatch(loginAsyncThunk(user))
  }
  
  React.useEffect(() => {
    if (authStatus === "getme") {
      navigate("/profile")
    }
  }, [authStatus])

  const handleAuthFormPage = (pathname: string) => {
    dispatch(setCurrentPathname(pathname))
  }

  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <div className={styles.space}>
          <h1 className={styles.title}>Войдите в свою учетную запись</h1>

          <form className={styles.form} action="#">
            {/*-------------------------------------------------------------------------------------------------Email*/}
            <div>
              <label className={styles.label}>Введите почту</label>
              <input type="email"
                     name="email"
                     className={styles.input}
                     placeholder="name@gmail.com"
                     ref={emailRef}
              />
            </div>
            {/*----------------------------------------------------------------------------------------------Password*/}
            <div>
              <label className={styles.label}>Пароль</label>
              <input type="password"
                     name="password"
                     placeholder="••••••••"
                     className={styles.input}
                     ref={passwordRef}
              />
            </div>
            {/*------------------------------------------------------------------------------Link to Recover Password*/}
            <div className="flex justify-end">
              <Link to={"/profile/recover-password"}
                    className={styles.forgot_password}
                    onClick={() => handleAuthFormPage("recover-password")}
              >Забыли пароль?
              </Link>
            </div>
            {/*Submit*/}
            <Button type="submit"
                    className={styles.btn}
                    onClick={handleSubmit}
            >Войти
            </Button>

            {/*--------------------------------------------------------------------------------------Link to Register*/}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              У вас еще нет учетной записи?
              <Link to={"/profile/register"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => handleAuthFormPage("register")}
              > Регистрация
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>

  );
};

