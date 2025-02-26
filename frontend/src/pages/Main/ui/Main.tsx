import {Toaster} from "react-hot-toast";
import {Outlet} from "react-router-dom";

export const Main = () => {
  return (
    <div>
      <Outlet/>
      <Toaster/>
    </div>
  );
};

