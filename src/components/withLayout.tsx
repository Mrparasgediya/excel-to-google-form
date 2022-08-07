import TokenContext from "contexts/Token/TokenContext";
import React, { Fragment, useContext, useEffect } from "react";
import Container from "./Container";
import Navbar from "./Navbar";

const withLayout = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const {
      actions: { setToken },
    } = useContext(TokenContext);

    useEffect(() => {
      (async () => {
        const { token } = await (
          await fetch("http://localhost:3000/api/auth/token")
        ).json();
        setToken(token);
      })();
    }, []);

    return (
      <Fragment>
        <Navbar />
        <Container classes="mt-8">
          <Component {...props} />
        </Container>
      </Fragment>
    );
  };
};

export default withLayout;
