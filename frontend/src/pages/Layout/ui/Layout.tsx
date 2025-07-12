import {Outlet} from "react-router-dom";
import {Navigation} from "../../../components/Navigation";
import {ProfileNavigation} from "../../../components/ProfileNavigation";

// import React from "react";


export const Layout = () => {

  return (
    <>
      <div className="sm:flex">
        {/*Навигация sidebar*/}
        <Navigation/>
        <div className="sm:ml-[280px] mt-5 flex-1">
          {/*Навигация "Логин/Регистер/Пользователь"*/}
          <ProfileNavigation/>
          {/*Остальной контент*/}
          <Outlet/>
        </div>
      </div>
    </>
  );
};

