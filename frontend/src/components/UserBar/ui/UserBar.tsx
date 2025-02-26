import React from 'react';
import {useNavigate} from "react-router-dom";
import {appUseDispatch, appUseSeletor} from "../../../redux/redux-hooks.ts";
import {logoutAsyncThunk} from "../../../redux/features/asyncActions/authAsyncThunk.ts";
import {toast} from "react-hot-toast";
import {BiLogOut} from "react-icons/bi";
import {UserBarSkeleton} from "../../Skeletons/UserBarSkeleton";

export const UserBar = () => {
  const navigate = useNavigate();
  const dispatch = appUseDispatch();
  const {user, status: authStatus, message: authMessage, loading: authLoading} = appUseSeletor(state => state.authReducer)

  const handleLogout = () => {
    dispatch(logoutAsyncThunk())
  }

  React.useEffect(() => {
    if (authStatus === "logout" && authLoading === "fulfilled") {
      toast.success(authMessage)
      navigate("/login")
    }
  }, [authStatus])


  return (
    <div className="">
      {authLoading === "pending" && <UserBarSkeleton/>}
      {authLoading === "fulfilled" && (
        <div className="flex w-[200px] justify-between items-center gap-2">
          <h1 className="text-sm max-w-[150px] overflow-hidden overflow-ellipsis">
            {user?.email}</h1>
          <button className="hover:text-pink-700" title="Выйти" onClick={handleLogout}>
            <BiLogOut className="size-7"/>
          </button>
        </div>
      )}
    </div>
  );
};



