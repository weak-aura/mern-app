import {Outlet} from "react-router-dom";
import {SideBar} from "../../../components/SideBar";

export const Layout = () => {
  
  return (
    <>
      <div className="hidden sm:flex mt-5">
        <SideBar/>
        <div className="px-6 flex-1">
          <Outlet/>
        </div>
      </div>
      <div className="flex justify-center items-center sm:hidden h-[100vh]">
        <p className="font-mono text-center text-lg">Мобильная версия еще в разработке, <br/> пожалуйста откройте в режиме ПК.</p>
      </div>
      <footer className="fixed font-sans bottom-0 left-0 w-full bg-[--sidebar-bg] text-base text-white p-2 text-center">
        &copy; 2025 Mern App. Все права защищены.
      </footer>
    </>
  );
};

