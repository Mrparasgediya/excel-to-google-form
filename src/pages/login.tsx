import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import Button from "components/Button";
import GoogleIcon from "components/GoogleIcon";
import withLayout from "components/withLayout";
import TokenContext from "contexts/token/TokenContext";
import ButtonLink from "components/ButtonLink";

const LogInPage: NextPage = () => {
  const {
    state: { token },
  } = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center gap-5 flex-col h-full">
      <h2 className="font-bold text-center text-3xl">Login</h2>
      <ButtonLink href="/api/auth/login">
        <Button
          color="fuchsia"
          onClick={() => {
            setIsLoading(true);
          }}
          isLoading={isLoading}
          loadingText="Logging to google..."
          classes="flex items-center gap-2"
        >
          <Fragment>
            <GoogleIcon />
            Login In With Google
          </Fragment>
        </Button>
      </ButtonLink>
    </div>
  );
};

export default withLayout(LogInPage, "w-80 h-40 mt-24 glass glass--white");
