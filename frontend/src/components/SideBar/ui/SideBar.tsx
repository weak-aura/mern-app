// import React from 'react';


import {DesktopNavigation} from "../DesktopNavigation";

export const SideBar = () => {
  
  return (
    <div>
      <div className="hidden sm:block">
        <DesktopNavigation/>
      </div>
      <div className="block sm:hidden">
        {/*<MobileNavigation/>*/}
      </div>
    </div>
  );
};

