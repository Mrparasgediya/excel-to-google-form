import { FC } from "react";
import FetchUrlCotextProvider from "./fetchUrl/FetchUrlProvider";
import FileContextProvider from "./file/FileProvider";
import TokenContextProvider from "./token/TokenProvider";

const ContextProvider: FC<{ children: any }> = ({ children }) => {
  return (
    <TokenContextProvider>
      <FetchUrlCotextProvider>
        <FileContextProvider>{children}</FileContextProvider>
      </FetchUrlCotextProvider>
    </TokenContextProvider>
  );
};

export default ContextProvider;
