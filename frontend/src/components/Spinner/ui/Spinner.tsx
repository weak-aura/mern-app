import React from 'react';

interface LoadingTypes {
  children?: React.ReactNode
}

export const Spinner = (props: LoadingTypes) => {
  return (
      <div className="flex flex-col justify-center items-center">
        <div
          className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
        </div>
        <h1 className="text-center">{props.children}</h1>
      </div>
  );
};

