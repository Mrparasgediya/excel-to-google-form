import { FC } from "react";
import DisableLogoutContextProvider from "./disableLogout/DisableLogoutProvider";
import FileContextProvider from "./file/FileProvider";
import TokenContextProvider from "./token/TokenProvider";

const ContextProvider: FC<{ children: any }> = ({ children }) => {
  return (
    <TokenContextProvider>
      <FileContextProvider>
        <DisableLogoutContextProvider>{children}</DisableLogoutContextProvider>
      </FileContextProvider>
    </TokenContextProvider>
  );
};

export default ContextProvider;
