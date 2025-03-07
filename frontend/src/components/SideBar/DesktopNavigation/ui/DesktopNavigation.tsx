import React from 'react';
import styles from "./DesktopNavigation.module.scss";
import {motion} from "framer-motion";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {UserBar} from "../../../UserBar";
import {getMeAsyncThunk} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";

// react-icons:
import {IoHome} from "react-icons/io5";
import {IoIosCreate} from "react-icons/io";
import {FaThList} from "react-icons/fa";
import {MernLogo} from "../../../MernLogo";

export const DesktopNavigation = () => {
  const {id} = useParams();
  const tabs = [
    {pathname: "/", label: "Главная", icon: <IoHome className="size-5"/>},
    {pathname: !id ? "/posts/" : `/posts/${id}`, label: "Все посты", icon: <FaThList className="size-5"/>},
    {pathname: "/posts/create", label: "Создать Пост", icon: <IoIosCreate className="size-5"/>},
  ]

  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = appUseDispatch()
  const { cookie: authCookie} = appUseSeletor(state => state.authReducer)
  const {
    loading: authLoading,
    error: authError,
  } = appUseSeletor(state => state.authReducer);

  React.useEffect(() => {
    if (authCookie !== "auth_cache") {
      dispatch(getMeAsyncThunk())
    }
  }, [])

  React.useEffect(() => {
    if (authLoading === "fulfilled" && authError) {
      navigate("/login")
    }
  }, [authError]);

  const handleClickOnTab = (pathname: string) => {
    navigate(pathname)
  }

  return (
    <div className="max-w-[260px] flex flex-col min-w-[260px] h-[500px] bg-[#3D366A] rounded-r-[32px] rounded-l-[14px]">
      <div className="text-center pt-[40px] select-none">
        <MernLogo/>
      </div>
      <ul className="pl-[45px] pt-[40px] flex flex-col flex-1 text-sm font-medium ">
        {tabs.map((el) => (
          <button key={el.pathname}
                  onClick={() => handleClickOnTab(el.pathname)}
                  className="relative flex gap-3 items-center hover:text-[--test-color] cursor-pointer py-3 pl-6"
          >
            <span className="z-20">{el.icon}</span>
            <li>
              {/*RIGID-rounded-borders*/}
              {location.pathname === el.pathname && (
                <>
                  <motion.span layoutId="active-tab-main"
                               className="absolute top-[0px] left-[0px] rounded-l-[32px] w-full h-full bg-[--primary-bg]"/>
                  <motion.span layoutId="rigid-top" className={styles.rigid_border_top}/>
                  <motion.span layoutId="rigid-bottom" className={styles.rigid_border_bottom}/>
                </>
              )}
              <span className="relative z-10">{el.label}</span>
            </li>
          </button>
        ))}
      </ul>
      <div className="pl-7 my-5">
        <UserBar/>
      </div>
    </div>
  );
};

