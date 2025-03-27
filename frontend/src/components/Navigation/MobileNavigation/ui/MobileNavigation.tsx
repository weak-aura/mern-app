import React from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import styles from "./MobileNavigation.module.scss"
import {mountAnim, translateX} from "./../../motionAnim.ts";
import {TabsProps} from "../../ui/Navigation.tsx";

interface MobileNavigationProps {
  activeIndex: number
  setActiveIndex:  React.Dispatch<React.SetStateAction<number>>
  tabs: TabsProps[]
}

export const MobileNavigation = ({activeIndex, setActiveIndex, tabs} : MobileNavigationProps) => {
 
  const navigate = useNavigate();

  const handleSubmit = (el: TabsProps) => {
    setActiveIndex(el.id)
    navigate(el.path)
  }

  return (
    <div className={"flex justify-center"}>
      <div className="fixed bottom-0 w-full bg-[--sidebar-bg]">
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
                    className={`${activeIndex === el.id ? "-translate-y-[33%]" : "translate-y-[30%]"} ${styles.icon}`}>{el.icon}</span>
                </div>
              </div>
            </li>
          ))}
          {/*INDICATOR*/}
          <motion.span className={styles.indicator}
                       variants={translateX}
                       {...mountAnim}
                       custom={activeIndex}
          />
        </ul>
      </div>
    </div>
  );
};

