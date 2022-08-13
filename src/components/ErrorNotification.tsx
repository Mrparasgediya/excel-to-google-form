import ErrorContext from "contexts/Error/ErrorContext";
import React, { MouseEventHandler, useContext } from "react";
import Button from "./Button";
import CloseIcon from "./CloseIcon";

const ErrorNotification = () => {
  const {
    state: { errorMessage },
    actions: { setErrorMessage },
  } = useContext(ErrorContext);

  const handleCloseErrorClick: MouseEventHandler<HTMLButtonElement> = () => {
    setErrorMessage("");
  };

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 flex items-center glass glass--red p-2 min-h-max min-w-[300px] max-w-[65%]">
      <span className="flex-1">Error: {errorMessage}</span>
      <Button
        color="transparent"
        onClick={handleCloseErrorClick}
        hasShadows={false}
      >
        <CloseIcon />
      </Button>
    </div>
  );
};

export default ErrorNotification;
