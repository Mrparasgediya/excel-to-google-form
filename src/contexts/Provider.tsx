import { FC } from "react";
import DisableLogoutContextProvider from "./disableLogout/DisableLogoutProvider";
import ErrorContextProvider from "./Error/ErrorContextProvider";
import FileContextProvider from "./file/FileProvider";
import TokenContextProvider from "./token/TokenProvider";

const ContextProvider: FC<{ children: any }> = ({ children }) => {
  return (
    <ErrorContextProvider>
      <TokenContextProvider>
        <FileContextProvider>
          <DisableLogoutContextProvider>
            {children}
          </DisableLogoutContextProvider>
        </FileContextProvider>
      </TokenContextProvider>
    </ErrorContextProvider>
  );
};

export default ContextProvider;
