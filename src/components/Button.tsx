import React, { FC, Fragment, MouseEventHandler, useEffect } from "react";
import { ChildrenComponent } from "types/components.types";
import LoadingSpinner from "./LoadingSpinner";

const Button: FC<{
  children: ChildrenComponent | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  loadingText?: string;
  color?: "fuchsia" | "indigo";
  classes?: string;
}> = ({
  children,
  isLoading,
  loadingText,
  color = "indigo",
  classes,
  ...otherProps
}) => {
  return (
    <button
      className={`text-white text-md bg-${color}-500 flex items-center gap-1 px-2 py-1 rounded-md font-medium shadow-md shadow-${color}-400/80 transition-all ease-in  hover:bg-${color}-500/80 active:transform active:scale-95 active:shadow disabled:bg-${color}-300 ${
        classes | ""
      }`}
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
