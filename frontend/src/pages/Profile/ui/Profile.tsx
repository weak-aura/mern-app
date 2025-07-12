import React from "react";
import {useNavigate} from "react-router-dom";
import {appUseSeletor} from "../../../redux/redux-hooks.ts";


export const Profile = () => {
  const navigate = useNavigate();
  const {status: authStatus} = appUseSeletor(state => state.authReducer);
  
  React.useEffect(() => {
    if(authStatus === "logout") {
      navigate("/profile/login")
    }
  },[authStatus])
  
  return (
    <div>
        страница профиля
    </div>
  );
};
