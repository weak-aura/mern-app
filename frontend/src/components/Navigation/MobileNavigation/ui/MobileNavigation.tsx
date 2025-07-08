// import React from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import styles from "./MobileNavigation.module.scss"
import {mountAnim, translateX} from "./../../motionAnim.ts";
import {TabsProps} from "../../ui/Navigation.tsx";
import {appUseDispatch, appUseSeletor} from "../../../../redux/redux-hooks.ts";
import {setCurrentNavigatorIndex} from "../../../../redux/features/slices/navigationSlice.ts";

interface MobileNavigationProps {
  tabs: TabsProps[]
}

export const MobileNavigation = ({ tabs} : MobileNavigationProps) => {
  const dispatch = appUseDispatch();
  const navigate = useNavigate();
  const {currentNavigatorIndex} = appUseSeletor(state => state.navigationReducer)

  const handleSubmit = (el: TabsProps) => {
    dispatch(setCurrentNavigatorIndex(el.id))
    navigate(el.path)
  }

  return (
    <div className={"flex justify-center"}>
      <div className="fixed bottom-0 w-full bg-[--sidebar-bg] z-10">
        {/* NAVIGATION */}
        <ul className={"relative mx-auto max-w-[340px] justify-between flex px-2"}>
          {tabs.map((el) => (
            <li key={el.id}
                className={"z-10"}
                onClick={() => handleSubmit(el)}
            >
              <div className={"w-[70px] h-[70px]"}>
                <div className={"flex justify-center"}>
                  <span
                    className={`${currentNavigatorIndex === el.id ? "-translate-y-[33%]" : "translate-y-[30%]"} ${styles.icon}`}>{el.icon}</span>
                </div>
              </div>
            </li>
          ))}
          {/*INDICATOR*/}
          <motion.span className={styles.indicator}
                       variants={translateX}
                       {...mountAnim}
                       custom={currentNavigatorIndex}
          />
        </ul>
      </div>
    </div>
  );
};

