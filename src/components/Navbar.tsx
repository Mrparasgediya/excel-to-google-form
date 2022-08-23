import Button from "./Button";
import NextLink from "next/link";
import Container from "./Container";
import {
  Fragment,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import TokenContext from "contexts/token/TokenContext";
import { NextRouter, useRouter } from "next/router";
import ButtonLink from "./ButtonLink";
import config from "config";
import DisableLogoutContext from "contexts/disableLogout/DisableLogoutContext";
import ErrorContext from "contexts/Error/ErrorContext";
import { IFetchResponse } from "types/fetch.types";

const Navbar = () => {
  const {
    state: { token },
    actions: { setToken },
  } = useContext(TokenContext);
  const {
    state: { isLogoutDisabled },
  } = useContext(DisableLogoutContext);
  const titleRef = useRef<HTMLAnchorElement>(null);

  const { asPath, push }: NextRouter = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const {
    actions: { setErrorMessage },
  } = useContext(ErrorContext);

  useEffect(() => {
    if (screen.width >= 768 && titleRef.current) {
      // add converter text if it is not mobile device
      if (!/converter/gi.test(titleRef.current.textContent!)) {
        titleRef.current.textContent = `${titleRef.current.textContent} Converter`;
      }
    }
  }, []);

  const handleLogoutClick: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      setIsLoggingOut(true);
      // logout from server and revoke all access of this application
      const logoutResponse: IFetchResponse = await fetch(
        `${config.FETCH_BASE_URL}/api/auth/logout`,
        {
          headers: {
            Authorization: `Barear ${token}`,
          },
          method: "POST",
        }
      ).then((res) => res.json());
      if (logoutResponse.hasOwnProperty("error")) {
        throw new Error(logoutResponse.error);
      }
      setToken(undefined);
      setIsLoggingOut(false);
      push("/");
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsLoggingOut(false);
    }
  };
  return (
    <nav className="h-14 bg-white/75 backdrop-blur-lg flex items-center justify-center shadow-md shadow-blue-500/20 fixed border-2 w-full top-0 left-0 z-50">
      <Container
        classes={`flex items-center justify-between w-11/12 sm:w-8/12`}
      >
        <h1 className="font-semibold text-xl">
          <NextLink href="/" passHref>
            <a ref={titleRef}>Excel To Google Form</a>
          </NextLink>
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
