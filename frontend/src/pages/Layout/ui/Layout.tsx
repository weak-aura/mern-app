import {Outlet} from "react-router-dom";
import {Navigation} from "../../../components/Navigation";
import {appUseSeletor} from "../../../redux/redux-hooks.ts";
import {MernLogo} from "../../../components/MernLogo";


export const Layout = () => {

  const {status: authStatus, loading: authLoading} = appUseSeletor(state => state.authReducer)

  if (authStatus === null && authLoading === "pending") {
    return (
      <div className={"w-full h-[100vh] flex justify-center items-center"}>
        <MernLogo size={35} font_size={"text-[35px]"}/>
      </div>
    )
  }

  return (
    <>
      <div className="sm:flex">
        <Navigation/>
        <div className="sm:ml-[280px] mt-5 mx-5 flex-1">
          <Outlet/>
        </div>
      </div>
    </>
  );
};

