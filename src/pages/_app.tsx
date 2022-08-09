import FileContextProvider from "contexts/file/FileProvider";
import ContextProvider from "contexts/Provider";
import TokenContextProvider from "contexts/token/TokenProvider";
import type { AppProps } from "next/app";
import "styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
