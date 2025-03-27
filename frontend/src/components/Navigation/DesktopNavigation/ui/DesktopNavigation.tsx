import React from 'react';
import styles from "./DesktopNavigation.module.scss";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {getMeAsyncThunk} from "../../../../redux/features/asyncActions/authAsyncThunk.ts";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {mountAnim, translateY} from "../../motionAnim.ts";
import {TabsProps} from "../../ui/Navigation.tsx";
import {MernLogo} from "../../../MernLogo";

interface DesktopNavigationProps {
  activeIndex: number
  setActiveIndex:  React.Dispatch<React.SetStateAction<number>>
  tabs: TabsProps[]
}

export const DesktopNavigation = ({activeIndex, setActiveIndex, tabs} :DesktopNavigationProps) => {
  
  const navigate = useNavigate();
  const dispatch = appUseDispatch()

  const {cookie: authCookie} = appUseSeletor(state => state.authReducer);
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

  const handleSubmit = (el: TabsProps) => {
    setActiveIndex(el.id)
    navigate(el.path)
  }

  return (
    <div className={styles.root}>
      <div className={styles.logo}><MernLogo/></div>
      <ul>
        {tabs.map((el) => (
          <li key={el.id}
              onClick={() => handleSubmit(el)}
          >
            <div className={"flex items-center gap-2 h-[40px] w-full pl-4 hover:text-[--test-color]"}>
              <span className={"text-xl"}>{el.icon}</span>
              <h1 className={"text-xl font-semibold"}>{el.label}</h1>
            </div>
          </li>
        ))}
        {/*NAVIGATOR*/}
        <motion.div className={styles.navigator}
                    variants={translateY}
                    {...mountAnim}
                    custom={activeIndex}
        >
          <motion.span className={styles.rigid_border_top}/>
          <motion.span className={styles.rigid_border_bottom}/>
        </motion.div>
      </ul>
    </div>
  );
};

