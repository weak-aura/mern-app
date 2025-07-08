// import React from 'react';
import styles from "./DesktopNavigation.module.scss";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {mountAnim, translateY} from "../../motionAnim.ts";
import {TabsProps} from "../../ui/Navigation.tsx";
import {MernLogo} from "../../../MernLogo";
import {setCurrentNavigatorIndex} from "../../../../redux/features/slices/navigationSlice.ts";

interface DesktopNavigationProps {
  tabs: TabsProps[]
}

export const DesktopNavigation = ({ tabs}: DesktopNavigationProps) => {
  const dispatch = appUseDispatch()
  const navigate = useNavigate();
  const {currentNavigatorIndex} = appUseSeletor(state => state.navigationReducer)

  const handleSubmit = (el: TabsProps) => {
    dispatch(setCurrentNavigatorIndex(el.id)) 
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
                    custom={currentNavigatorIndex}
        >
          <motion.span className={styles.rigid_border_top}/>
          <motion.span className={styles.rigid_border_bottom}/>
        </motion.div>
      </ul>
    </div>
  );
};

