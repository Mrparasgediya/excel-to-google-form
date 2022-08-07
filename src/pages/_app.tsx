import TokenContextProvider from "contexts/Token/TokenProvider";
import type { AppProps } from "next/app";
import "styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TokenContextProvider>
      <Component {...pageProps} />
    </TokenContextProvider>
  );
}

export default MyApp;
