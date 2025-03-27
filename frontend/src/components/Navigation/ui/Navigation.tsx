import React from 'react';
import {DesktopNavigation} from "../DesktopNavigation";
import {MobileNavigation} from "../MobileNavigation";
import {useLocation, useParams} from "react-router-dom";
import {IoHome} from "react-icons/io5";
import {TiThList} from "react-icons/ti";
import {FaPenSquare} from "react-icons/fa";
import {ImUser} from "react-icons/im";

export interface TabsProps {
  id: number
  path: string
  label: string
  icon: React.JSX.Element
}

export const Navigation = () => {
  const {id} = useParams();
  const location = useLocation()
  const tabs: TabsProps[] = [
    {
      id: 0,
      path: "/",
      label: "Главная",
      icon: <IoHome/>,
    },
    {
      id: 1,
      path: !id ? "/posts/" : `/posts/${id}`,
      label: "Публикаций",
      icon: <TiThList/>,
    },
    {
      id: 2,
      path: "/posts/create",
      label: "Создать",
      icon: <FaPenSquare/>,
    },
    {
      id: 3,
      path: `/profile`,
      label: "Профиль",
      icon: <ImUser/>,
    },
  ]

  const currentIndex = tabs.findIndex(el => el.path === location.pathname);
  const [activeIndex, setActiveIndex] = React.useState(currentIndex)

  return (
    <div>
      <div className="hidden sm:block">
        <DesktopNavigation setActiveIndex={setActiveIndex} activeIndex={activeIndex} tabs={tabs}/>
      </div>
      <div className="block sm:hidden">
        <MobileNavigation setActiveIndex={setActiveIndex} activeIndex={activeIndex} tabs={tabs}/>
      </div>
    </div>
  );
};

