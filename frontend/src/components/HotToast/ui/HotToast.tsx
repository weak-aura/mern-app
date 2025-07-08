import React from 'react';

interface HotToastProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  children: React.ReactNode
}

export const HotToast = (props: HotToastProps) => {
  
  return (
    <div className={"flex items-center"}>
      <div className={"flex items-center gap-2"}>
        <p className={"text-sm text-gray-500"}>{props.children}</p>
      </div>

      <button onClick={props.onClick}
              className={"pl-2 border-l h-full text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"}
      >закрыть
      </button>
    </div>
  );
};

