import React, { FC, RefObject, useEffect, useRef, useState } from "react";
import { ChildrenComponent } from "types/components.types";
import ErrorContext from "./ErrorContext";

const ErrorContextProvider: FC<{ children: ChildrenComponent }> = ({
  children,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  let timeoutValueRef: RefObject<{
    value: any;
  }> = useRef({ value: 0 });

  useEffect(() => {
    if (errorMessage && errorMessage?.length) {
      const currrentTimeoutValue = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      if (timeoutValueRef.current) {
        timeoutValueRef.current.value = currrentTimeoutValue;
      }
    } else {
      // clear timeout if exists
      if (timeoutValueRef.current && timeoutValueRef.current.value) {
        clearTimeout(timeoutValueRef.current.value);
      }
    }
  }, [errorMessage]);

  return (
    <ErrorContext.Provider
      value={{
        state: { errorMessage },
        actions: {
          setErrorMessage,
        },
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
