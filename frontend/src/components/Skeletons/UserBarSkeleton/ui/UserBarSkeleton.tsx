// import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from "react-loading-skeleton";

export const UserBarSkeleton = () => {
  return (
    <div className="flex gap-2 justify-between items-center h-[28px] w-[200px]">
      <div className="flex-1">
        <Skeleton width={150} height={20}/>
      </div>
      <div className="">
        <Skeleton width={21} height={28}/>
      </div>
    </div>
  );
};

