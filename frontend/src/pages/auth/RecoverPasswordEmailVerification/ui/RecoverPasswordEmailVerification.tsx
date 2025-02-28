import React from 'react';
import styles from "./RecoverPasswordEmailVerification.module.scss"
import {FaArrowLeftLong} from "react-icons/fa6";
import {Button} from "../../../../components/buttons/Button";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {
  getMeAsyncThunk,
  recoverPasswordEmailVerificationAsyncThunk,
  recoverPasswordResendCodeAsyncThunk,
} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {Spinner} from "../../../../components/Spinner";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

export const RecoverPasswordEmailVerification = () => {
  const navigate = useNavigate();
  const codeRef = React.useRef<HTMLInputElement>(null)
  const dispatch = appUseDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const {
    loading: authLoading,
    status: authStatus,
    message: authMessage,
    error: authError,
    cookie: authCookie,
    cookie_code,
    hook_pending
  } = appUseSeletor(state => state.authReducer)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = {verifyCode: codeRef?.current?.value}
    dispatch(recoverPasswordEmailVerificationAsyncThunk(code))
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
  
  // fetch resend code
  const handleResendCode = () => {
    dispatch(recoverPasswordResendCodeAsyncThunk())
    setIsFormSubmitted(true)
  }
  
  React.useEffect(() => {
    if(isFormSubmitted && authStatus === "r_pwd_email_verified" && authLoading === "fulfilled"){
      navigate("/recover_password/reset")
      setIsFormSubmitted(false)
    }
  }, [authStatus])

  return (
    <div>
      <div className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-[100vh]">
        <div className="p-4 w-full max-w-md max-h-full">

          {/*-- Modal content --*/}
          <div className={styles.content}>

            {/*-- Modal header --*/}
            <div className={styles.header}>
              <button type="button" className={styles.arrow_left_btn}>
                <Link to={"/recover_password"}><FaArrowLeftLong className="size-6"/></Link>
              </button>

              <h3 className={styles.header_h1}>
                Подтверждение почты
              </h3>
            </div>

            {/*-- Modal body --*/}
            <form className="p-5 space-y-4" onSubmit={handleSubmit}>
              <div>

                {/*CODE_INPUT */}
                <label className={styles.form_email_label}>Введите код из почты</label>
                <input ref={codeRef}
                       className={styles.form_email_input}
                       placeholder="******" required/>

              </div>

              <Button type="submit"
                      className={`w-full ${authLoading === "pending" && "pointer-events-none cursor-default"}`}>
                {authLoading === "pending" && hook_pending !== "resend_code" ? <Spinner/> : "Подтвердить"}
              </Button>
              {cookie_code === "invalid_code" && (
                <Button type={"button"} onClick={handleResendCode}
                        className={`w-full ${authLoading === "pending" && "pointer-events-none cursor-default"}`}>
                  {authLoading === "pending" && hook_pending === "resend_code" ? <Spinner/> : "Отправить код повторно"}
                </Button>
                
              )}

            </form>

          </div>
        </div>
      </div>

    </div>
  );
};