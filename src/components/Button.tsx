import React, { FC, Fragment, MouseEventHandler, useEffect } from "react";
import { ChildrenComponent } from "types/components.types";
import LoadingSpinner from "./LoadingSpinner";

const Button: FC<{
  children: ChildrenComponent | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  loadingText?: string;
}> = ({ children, isLoading, loadingText, ...otherProps }) => {
  useEffect(() => {
    console.log("is loading ", isLoading);
  }, [isLoading]);
  return (
    <button
      className="text-white text-md bg-indigo-500 flex items-center gap-1 px-2 py-1 rounded-md font-medium shadow-md shadow-indigo-400/80 transition-all ease-in  hover:bg-indigo-500/80 active:transform active:scale-95 active:shadow disabled:bg-indigo-300"
      {...otherProps}
      disabled={!!isLoading}
    >
      {isLoading ? (
        <Fragment>
          <LoadingSpinner />
          <p className="text-sm">{loadingText || "loading"}</p>
        </Fragment>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
