import TokenContext from "contexts/token/TokenContext";
import React, { FC, Fragment, useContext, useEffect } from "react";
import Container from "./Container";
import Navbar from "./Navbar";
import config from "config";

const withLayout = <P extends object>(
  Component: React.ComponentType<P>,
  containerStyles: string = ""
) => {
  const MyComponent: FC<P & { token: string }> = (props) => {
    const {
      actions: { setToken },
    } = useContext(TokenContext);

    useEffect(() => {
      if (props.token) {
        // set token if we get token from server
        setToken(props.token);
      } else {
        // get token from server and set to it
        (async () => {
          const { token } = await (
            await fetch(`${config.FETCH_BASE_URL}/api/auth/token`)
          ).json();
          setToken(token);
        })();
      }
    }, []);

    return (
      <Fragment>
        <Navbar />
        <Container
          classes={`py-14 ${!containerStyles.includes("mt-") ? "mt-8" : ""} ${
            containerStyles || ""
          }`}
        >
          <Component {...props} />
        </Container>
      </Fragment>
    );
  };
  MyComponent.displayName = "WithLayoutHOC";
  return MyComponent;
};

export default withLayout;
