import React from 'react';
import {DesktopNavigation} from "../DesktopNavigation";
import {MobileNavigation} from "../MobileNavigation";
import {useLocation, useParams} from "react-router-dom";
import {IoHome} from "react-icons/io5";
import {TiThList} from "react-icons/ti";
import {FaPenSquare} from "react-icons/fa";
import {ImUser} from "react-icons/im";
import {appUseDispatch, appUseSeletor} from "../../../redux/redux-hooks.ts";
import {setCurrentNavigatorIndex} from "../../../redux/features/slices/navigationSlice.ts";

export interface TabsProps {
  id: number
  path: string
  label: string
  icon: React.JSX.Element
}

export const Navigation = () => {
  const dispatch = appUseDispatch();
  const {id} = useParams();
  const location = useLocation();
  const {currentPathname} = appUseSeletor(state => state.navigationReducer);
  const {status: authStatus} = appUseSeletor(state => state.authReducer)

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
      path:  authStatus === "getme" ? "/profile" : `/profile/${currentPathname}`,
      label: "Профиль",
      icon: <ImUser/>,
    },
  ]
  
  const currentIndex = tabs.findIndex(el => el.path === location.pathname);

  // Делает перерисовку для текущих индексов после обновления страницы
  React.useEffect(() => {
    dispatch(setCurrentNavigatorIndex(currentIndex))
  }, [location])
  
  return (
    <div>
      <div className="hidden sm:block">
        <DesktopNavigation tabs={tabs}/>
      </div>
      <div className="block sm:hidden">
        <MobileNavigation tabs={tabs}/>
      </div>
    </div>
  );
};

