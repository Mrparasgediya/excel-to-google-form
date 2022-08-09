import React, { FC, Fragment, MouseEventHandler, useEffect } from "react";
import { ChildrenComponent } from "types/components.types";
import LoadingSpinner from "./LoadingSpinner";

const Button: FC<{
  children: ChildrenComponent | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  loadingText?: string;
  color?: "fuchsia" | "indigo" | "green" | "red";
  classes?: string;
  disabled?: boolean;
  hasShadows?: boolean;
}> = ({
  children,
  isLoading,
  disabled,
  loadingText,
  color,
  classes,
  hasShadows = true,
  ...otherProps
}) => {
  let colorStyles =
    "bg-indigo-500 shadow-indigo-400/80  hover:bg-indigo-500/80 disabled:bg-indigo-300";
  if (color && color == "fuchsia") {
    colorStyles =
      "bg-fuchsia-500 shadow-fuchsia-400/80  hover:bg-fuchsia-500/80 disabled:bg-fuchsia-300";
  }
  if (color && color == "red") {
    colorStyles =
      "bg-red-500 shadow-red-400/80  hover:bg-red-500/80 disabled:bg-red-300";
  }
  if (color && color == "green") {
    colorStyles =
      "bg-green-500 shadow-green-400/80  hover:bg-green-500/80 disabled:bg-green-300";
  }

  return (
    <button
      className={`text-white text-md flex items-center gap-1 px-2 py-1 rounded-md font-medium shadow-md transition-all ease-in active:transform active:scale-95 active:shadow disabled:cursor-not-allowed ${
        classes || ""
      } ${colorStyles} ${!hasShadows ? "shadow-none" : ""}`}
      disabled={!!isLoading || disabled}
      onClick={otherProps.onClick}
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
