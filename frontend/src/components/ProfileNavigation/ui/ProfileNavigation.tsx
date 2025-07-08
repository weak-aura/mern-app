import React from "react";
import styles from "../../../pages/Profile/ui/Profile.module.scss";
import {appUseDispatch, appUseSeletor} from "../../../redux/redux-hooks.ts";
import {getMeAsyncThunk, logoutAsyncThunk} from "../../../redux/features/asyncActions/authAsyncThunk.ts";
import {Link, useNavigate} from "react-router-dom";
import {setCurrentPathname} from "../../../redux/features/slices/navigationSlice.ts";
import {setLogout} from "../../../redux/features/slices/authSlice.ts";


const nav = [
  {text: "Войти", pathname: "login"},
  {text: "Регистрация", pathname: "register"},
]
export const ProfileNavigation = () => {
  const dispatch = appUseDispatch();
  const navigate = useNavigate();
  const {user, status: authStatus} = appUseSeletor(state => state.authReducer)
  const {currentPathname, currentNavigatorIndex} = appUseSeletor(state => state.navigationReducer);

  React.useEffect(() => {
    if (authStatus === "login") {
      dispatch(getMeAsyncThunk())
    }
    if (authStatus === "logout") {
      navigate("/profile/login")
    }
  }, [authStatus])

  const handleAuthFormPage = (pathname: string) => {
    dispatch(setCurrentPathname(pathname))
  }

  const handleLogout = () => {
    const logout = null
    dispatch(setLogout(logout))
    dispatch(logoutAsyncThunk())
  }
  
  return (
    <div>
      <div className="w-full flex justify-end">
        {!user && (
          <ul className={"flex items-center bg-[--sidebar-bg] p-1 rounded-2xl"}>
            {nav.map((el) => (
              <Link to={`/profile/${el.pathname}`} key={el.text}>
                <li
                  className={`${currentPathname === el.pathname && currentNavigatorIndex === 3 && styles.active} select-none cursor-pointer px-4 py-1`}
                  onClick={() => handleAuthFormPage(el.pathname)}
                >{el.text}</li>
              </Link>
            ))}
          </ul>
        )}
        {/*Authorized user*/}
        {user && (
          <div className={"flex"}>
            <div className={"bg-[--sidebar-bg] py-2 rounded-2xl px-4"}>{user?.email}</div>
            <button onClick={handleLogout}>Выйти</button>
          </div>
        )}
      </div>
    </div>
  );
};



