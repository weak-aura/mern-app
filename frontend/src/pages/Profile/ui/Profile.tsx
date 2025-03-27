import React from "react";
import styles from "./Profile.module.scss";
import {appUseDispatch, appUseSeletor} from "../../../redux/redux-hooks.ts";
import {ImExit} from "react-icons/im";
import {logoutAsyncThunk} from "../../../redux/features/asyncActions/authAsyncThunk.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

export const Profile = () => {
  const {user, status: authStatus, message: authMessage, loading: authLoading} = appUseSeletor(state => state.authReducer)
  const [toggle, setToggle] = React.useState(false)
  const dispatch = appUseDispatch();
  const navigate = useNavigate()
  
  const handleLogout = () => {
    dispatch(logoutAsyncThunk())
  }

  React.useEffect(() => {
    if (authStatus === "logout" && authLoading === "fulfilled") {
      toast.success(authMessage)
      navigate("/login")
    }
  }, [authStatus])
  
  return (
    <div>
      <div className={"flex gap-1"}>
        <div className={styles.user_picture}>
          <img
            src='https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat1&accessoriesType=Kurt&hatColor=Blue02&facialHairType=MoustacheFancy&facialHairColor=Brown&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Cumbia&eyeType=Close&eyebrowType=FlatNatural&mouthType=Eating&skinColor=Brown'
            alt="image"/>
        </div>

        <div className={"flex justify-between flex-col"}>
          <h1>{user?.email}</h1>
          <div className={"text-end cursor-pointer"} onClick={() => setToggle(true)}>
            <div className={"inline-flex gap-2 px-2 py-1 border rounded-lg h-fit"}>
              <h1>Выйти</h1>
              <span className={"text-[25px] cursor-pointer"}><ImExit/></span>
            </div>
          </div>
        </div>
      </div>

      {/*OVERLAY*/}
      {toggle && (
        <div className={styles.overlay} onClick={() => setToggle(false)}>
          <div className={styles.modal_frame} onClick={(e) => e.stopPropagation()}>
            <h1>Выйти из учетной записи?</h1>
            <ul>
              <li onClick={handleLogout}>Да</li>
              <li onClick={() => setToggle(false)}>Нет</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

