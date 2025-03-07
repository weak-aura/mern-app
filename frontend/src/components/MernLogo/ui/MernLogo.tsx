// import React from 'react';
import { BiLogoMongodb } from "react-icons/bi";
import { SiExpress } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa6";

interface MernLogoProps {
  size?: number
  font_size?: string | undefined
}

export const MernLogo = ({size, font_size}: MernLogoProps) => {
  return (
    <div>
      <div className={"inline-flex gap-1 px-2 py-1 bg-white rounded-md"}>
        <div className={"flex flex-col items-center text-[#3a863e]"}>
          <BiLogoMongodb size={size}/>
          <span className={`font-bold leading-none ${font_size}`}>M</span>
        </div>
        <div className={"flex flex-col items-center text-[#393939]"}>
        <SiExpress size={size}/>
          <span className={`font-bold leading-none ${font_size}`}>E</span>
        </div>
        <div className={"flex flex-col items-center text-[#24618f]"}>
        <FaReact size={size}/>
          <span className={`font-bold leading-none ${font_size}`}>R</span>
        </div>
        <div className={"flex flex-col items-center text-[#78b743]"}>
        <FaNode size={size}/>
          <span className={`font-bold leading-none ${font_size}`}>N</span>
        </div>
      </div>
    </div>
  );
};

