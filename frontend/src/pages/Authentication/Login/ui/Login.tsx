import React from 'react';
import styles from "./Login.module.scss"
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {loginAsyncThunk} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {Link, useNavigate} from "react-router-dom";
import {setCurrentPathname} from "../../../../redux/features/slices/navigationSlice.ts";
import {Button} from "../../../../components/ButtonSkins/Button";
import {Spinner} from "../../../../components/Spinner";
import {LuEye, LuEyeClosed} from "react-icons/lu";

export const Login = () => {
  const dispatch = appUseDispatch();
  const navigate = useNavigate();
  const {
    status: authStatus,
    loading: authLoading
  } = appUseSeletor(state => state.authReducer);
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = React.useState(false)
  const [password, setPassword] = React.useState<string | undefined>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: emailRef.current?.value,
      password: password
    }
    dispatch(loginAsyncThunk(user))
  }
  
  const handleAuthFormPage = (pathname: string) => {
    dispatch(setCurrentPathname(pathname))
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  
  React.useEffect(() => {
    if(authStatus === "getme") {
      navigate("/profile")
    }
  },[authStatus])

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
              <div className={"relative"}>
                <input type={showPassword ? "text" : "password"}
                       placeholder="Введите свой пароль"
                       className={`${styles.input} hide-password-reveal`}
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
            >{authLoading === "pending" ? (
              <div className={"flex gap-2 justify-center items-center"}>Загрузка...<Spinner/></div>) : (
              <p>Отправить</p>)}
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

