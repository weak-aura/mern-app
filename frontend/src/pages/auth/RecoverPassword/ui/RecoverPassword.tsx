import React from 'react';
import styles from "./RecoverPassword.module.scss";
import {FaArrowLeftLong} from "react-icons/fa6";
import {Button} from "../../../../components/buttons/Button";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {
  getMeAsyncThunk,
  recoverPasswordAsyncThunk
} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {Spinner} from "../../../../components/Spinner";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

export const RecoverPassword = () => {
  const navigate = useNavigate();
  const emailRef = React.useRef<HTMLInputElement>(null)
  const dispatch = appUseDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const {
    loading: authLoading,
    status: authStatus,
    message: authMessage,
    error: authError,
    cookie: authCookie
  } = appUseSeletor(state => state.authReducer)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = {
      email: emailRef?.current?.value
    }
    dispatch(recoverPasswordAsyncThunk(email))
    setIsFormSubmitted(true)
  }

  // Navigate to the next page if form submitted and allow return back, send new form
  React.useEffect(() => {
    if (isFormSubmitted && authStatus === "recover_password" && authLoading === "fulfilled") {
      navigate("/recover_password/email_verification")
      setIsFormSubmitted(false)
    }
  }, [authStatus, isFormSubmitted, authLoading])

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

  return (
    <div>
      <div className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-[100vh]">
        <div className="p-4 w-full max-w-md max-h-full">

          {/*-- Modal content --*/}
          <div className={styles.content}>

            {/*-- Modal header --*/}
            <div className={styles.header}>
              <Link to={"/login"}>
                <button type="button" className={styles.arrow_left_btn}>
                  <FaArrowLeftLong className="size-6"/>
                </button>
              </Link>
              <h3 className={styles.header_h1}>
                Восстановить пароль
              </h3>
            </div>

            {/*-- Modal body --*/}
            <form className="p-5 space-y-4" onSubmit={handleSubmit}>
              <div>

                {/*EMAIL_INPUT */}
                <label htmlFor="email" className={styles.form_email_label}>Введите почту</label>
                <input type="email" name="email" id="email"
                       ref={emailRef}
                       className={styles.form_email_input}
                       placeholder="name@gmail.com" required/>
              </div>

              <Button type="submit"
                      className={`w-full ${authLoading === "pending" && "pointer-events-none cursor-default"}`}>
                {authLoading === "pending" ? <Spinner/> : "Отправить"}
              </Button>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
};

