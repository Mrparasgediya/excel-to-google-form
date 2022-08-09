import { FC } from "react";
import FileContextProvider from "./file/FileProvider";
import TokenContextProvider from "./token/TokenProvider";

const ContextProvider: FC<{ children: any }> = ({ children }) => {
  return (
    <TokenContextProvider>
      <FileContextProvider>{children}</FileContextProvider>
    </TokenContextProvider>
  );
};

export default ContextProvider;
