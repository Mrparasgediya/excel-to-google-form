import Button from "./Button";
import NextLink from "next/link";
import Container from "./Container";
import { Fragment, MouseEventHandler, useContext, useState } from "react";
import TokenContext from "contexts/token/TokenContext";
import { NextRouter, useRouter } from "next/router";
import ButtonLink from "./ButtonLink";
import config from "config";
import DisableLogoutContext from "contexts/disableLogout/DisableLogoutContext";

const Navbar = () => {
  const {
    state: { token },
    actions: { setToken },
  } = useContext(TokenContext);
  const {
    state: { isLogoutDisabled },
  } = useContext(DisableLogoutContext);

  const { asPath, push }: NextRouter = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleLogoutClick: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      setIsLoggingOut(true);
      // logout from server and revoke all access of this application
      await fetch(`${config.FETCH_BASE_URL}/api/auth/logout`, {
        headers: {
          Authorization: `Barear ${token}`,
        },
        method: "POST",
      });
      setToken(undefined);
      setIsLoggingOut(false);
      push("/");
    } catch (error) {
      console.log(error);
      setIsLoggingOut(false);
    }
  };
  return (
    <nav className="h-14 bg-white/75 backdrop-blur-lg flex items-center justify-center shadow-md shadow-blue-500/20">
      <Container classes={`flex items-center justify-between`}>
        <h1 className="font-semibold text-xl">
          <NextLink href="/">Excel To Google Form Converter</NextLink>
        </h1>
        {!asPath.endsWith("login") ? (
          !!token ? (
            <Button
              disabled={isLogoutDisabled}
              isLoading={isLoggingOut}
              loadingText="Logging out"
              onClick={handleLogoutClick}
            >
              Log Out
            </Button>
          ) : (
            <ButtonLink href="/login">
              <Button>Log in</Button>
            </ButtonLink>
          )
        ) : (
          <Fragment />
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
