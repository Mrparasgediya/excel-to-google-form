import Button from "components/Button";
import ButtonLink from "components/ButtonLink";
import withLayout from "components/withLayout";
import type { NextPage } from "next";
import NextLink from "next/link";

const Home: NextPage = () => {
  return (
    <div className="space-y-4 glass glass--white p-4">
      <h2 className="font-bold text-3xl">Excel To Google Form Converter</h2>
      <h3 className="font-smibold text-xl">
        Watch Documentation To Prepare Excel File
      </h3>
      <div className="flex items-center gap-2">
        <ButtonLink
          target="_blank"
          href="https://github.com/Mrparasgediya/excel-to-google-form"
        >
          <Button>Watch Documentation</Button>
        </ButtonLink>
        <ButtonLink href="/convert">
          <Button>Convert Excel To Form</Button>
        </ButtonLink>
      </div>
    </div>
  );
};

export default withLayout(Home);
