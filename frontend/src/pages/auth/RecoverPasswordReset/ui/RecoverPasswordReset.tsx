import React from 'react';
import styles from "../../RecoverPasswordEmailVerification/ui/RecoverPasswordEmailVerification.module.scss";
import {FaArrowLeftLong} from "react-icons/fa6";
import {Button} from "../../../../components/buttons/Button";
import {Spinner} from "../../../../components/Spinner";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {
  getMeAsyncThunk,
  recoverPasswordResetAsyncThunk
} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

export const RecoverPasswordReset = () => {
  const navigate = useNavigate();
  const dispatch = appUseDispatch()
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null)
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const {
    loading: authLoading,
    status: authStatus,
    message: authMessage,
    error: authError,
    cookie: authCookie
  } = appUseSeletor(state => state.authReducer)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPassword = {
      password: passwordRef?.current?.value,
      confirmPassword: confirmPasswordRef?.current?.value
    }
    dispatch(recoverPasswordResetAsyncThunk(newPassword))
    setIsFormSubmitted(true)
  }

  // Toaster
  React.useEffect(() => {
    if (authLoading === "fulfilled" && authError && isFormSubmitted) {
      toast.error(authError)
      setIsFormSubmitted(false)
    } else if (authLoading === "fulfilled" && authMessage && isFormSubmitted) {
      toast.success(authMessage)
      setIsFormSubmitted(false)
    }
  }, [authLoading])

  // Checking auth 
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
  
  React.useEffect(() => {
    if(authLoading === "fulfilled" && authStatus === "password_updated") {
      navigate("/login")
    }
  }, [authStatus])
  
  console.log("render:", authLoading)

  return (
    <div>
      <div className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-[100vh]">
        <div className="p-4 w-full max-w-md max-h-full">

          {/*-- Modal content --*/}
          <div className={styles.content}>

            {/*-- Modal header --*/}
            <div className={styles.header}>
              <Link to={"/recover_password"}>
                <button type="button" className={styles.arrow_left_btn}>
                  <FaArrowLeftLong className="size-6"/>
                </button>
              </Link>
              <h3 className={styles.header_h1}>
                Новый пароль
              </h3>
            </div>

            {/*-- Modal body --*/}
            <form className="p-5 space-y-4" onSubmit={handleSubmit}>
              <div>

                {/* PASSWORD_INPUT */}
                <label className={styles.form_email_label}>Пароль</label>
                <input ref={passwordRef}
                       className={styles.form_email_input}
                       placeholder="******" required/>

                {/* CONFIRM_PASSWORD_INPUT */}
                <label className={styles.form_email_label}>Подтверждение Пароля</label>
                <input ref={confirmPasswordRef}
                       className={styles.form_email_input}
                       placeholder="******" required/>

              </div>

              <Button type="submit"
                      className={`w-full ${authLoading === "pending" && "pointer-events-none cursor-default"}`}>
                {authLoading === "pending" ? <Spinner/> : "Подтвердить"}
              </Button>

            </form>

          </div>
        </div>
      </div>

    </div>
  );
};

