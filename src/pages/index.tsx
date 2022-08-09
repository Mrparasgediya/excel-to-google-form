import Button from "components/Button";
import ButtonLink from "components/ButtonLink";
import withLayout from "components/withLayout";
import type { GetStaticProps, NextPage } from "next";
import config from "config";

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">HEllo world</h1>
      <ButtonLink href="/convert">
        <Button>Convert Excel To Form</Button>
      </ButtonLink>
    </div>
  );
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      baseFetchUrl: config.FETCH_BASE_URL,
    },
  };
};
