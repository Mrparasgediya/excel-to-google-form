import Button from "./Button";
import NextLink from "next/link";
import Container from "./Container";
import { MouseEventHandler, useContext, useState } from "react";
import TokenContext from "contexts/Token/TokenContext";
const Navbar = () => {
  const {
    state: { token },
    actions: { setToken },
  } = useContext(TokenContext);

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleLogoutClick: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      setIsLoggingOut(true);
      // logout from server and revoke all access of this application
      const data = await fetch("http://localhost:3000/api/auth/logout", {
        headers: {
          Authorization: `Barear ${token}`,
        },
      });
      console.log(await data.json());
      setToken(undefined);
      setIsLoggingOut(false);
    } catch (error) {
      console.log(error);
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="h-14 bg-white/75 backdrop-blur-lg flex items-center justify-center shadow-md shadow-blue-500/20">
      <Container classes={`flex items-center justify-between`}>
        <h1 className="font-semibold text-xl">
          Excel To Google Form Converter
        </h1>
        {!!token ? (
          <Button
            isLoading={isLoggingOut}
            loadingText="Logging out"
            onClick={handleLogoutClick}
          >
            Log Out
          </Button>
        ) : (
          <Button>
            <NextLink href="/login">Log in</NextLink>
          </Button>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
