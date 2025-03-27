// import React from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface PostCardSkeletonProps {
  cards: number
}

export const PostCardSkeleton = ({cards}: PostCardSkeletonProps) => {
  return (
    Array(cards).fill(0).map((_, i) => (
      <>
        <div className={"hidden sm:block"}>
          <div className="-z-10 border rounded-lg border-[#343E4D] h-[330px] w-full overflow-hidden" key={i}>
            <div>
              <Skeleton className="h-[140px] translate-y-[-4px]"/>
            </div>

            <div className="px-3 mt-2">
              {/*DESC*/}
              <Skeleton count={3}/>

              {/*AUTHOR-DATE*/}
              <div className="w-[80%] ml-[20%]">
                <Skeleton count={2} className="h-4"/>
              </div>
              
              {/*BUTTON*/}
              <div className="w-[89px] mt-1">
                <Skeleton height={36} borderRadius={8}/>
              </div>
            </div>
          </div>
        </div>
        {/*MOBILE_MEDIA*/}
        <div className={"block sm:hidden"}>
          <div className="border rounded-lg border-[#343E4D] h-[240px] w-full overflow-hidden" key={i}>
            {/*img*/}
            <div>
              <Skeleton className="h-[110px] translate-y-[-4px]"/>
            </div>

            <div className="px-2">
              <Skeleton count={5} className={"text-sm"}/>
            </div>
          </div>
        </div>
      </>
    ))
  );
};

