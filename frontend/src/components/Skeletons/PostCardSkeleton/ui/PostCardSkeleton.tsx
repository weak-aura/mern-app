// import React from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface PostCardSkeletonProps {
  cards: number
}
export const PostCardSkeleton = ({cards} :PostCardSkeletonProps) => {
  return (
    Array(cards).fill(0).map((_,i) => (
      <div className="-z-10 border rounded-lg border-[#343E4D] min-h-[385px]  min-w-screen" key={i}>
        <div>
          <Skeleton className="h-[140px]"/>
        </div>

        <div className="p-3">
          <div className="TITLE">
            <Skeleton/>
          </div>
          <div className="DESCRIPTION">
            <Skeleton count={3}/>
          </div>
          <div className="AUTHOR-DATE mt-8 w-[80%] ml-[20%]">
            <Skeleton count={2} className="h-4"/>
          </div>

          <div className="w-[89px]">
            <Skeleton height={36} borderRadius={8}/>
          </div>
        </div>

      </div>
    ))
  );
};

