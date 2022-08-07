import withLayout from "components/withLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">HEllo world</h1>
    </div>
  );
};

export default withLayout(Home);
