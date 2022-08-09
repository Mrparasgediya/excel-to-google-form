import FetchUrlContext from "contexts/fetchUrl/FetchUrlContext";
import TokenContext from "contexts/token/TokenContext";
import React, { Fragment, useContext, useEffect } from "react";
import Container from "./Container";
import Navbar from "./Navbar";

const withLayout = <P extends object>(
  Component: React.ComponentType<P>,
  containerStyles: string = ""
) => {
  return (props: P & { token: string; baseFetchUrl: string }) => {
    const {
      actions: { setToken },
    } = useContext(TokenContext);

    const { baseFetchUrl, setBaseFetchUrl } = useContext(FetchUrlContext);

    useEffect(() => {
      if (props.baseFetchUrl) {
        setBaseFetchUrl(props.baseFetchUrl);
      }
      if (props.token) {
        // set token if we get token from server
        setToken(props.token);
      } else {
        // get token from server and set to it
        (async () => {
          const { token } = await (
            await fetch(`${props.baseFetchUrl || baseFetchUrl}/api/auth/token`)
          ).json();
          setToken(token);
        })();
      }
    }, []);

    return (
      <Fragment>
        <Navbar />
        <Container
          classes={`${!containerStyles.includes("mt-") ? "mt-8" : ""} ${
            containerStyles || ""
          }`}
        >
          <Component {...props} />
        </Container>
      </Fragment>
    );
  };
};

export default withLayout;
