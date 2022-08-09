import withLayout from "components/withLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { Fragment, useContext, useEffect } from "react";
import FileForm from "components/FileForm";
import FileContext, { IFileContext } from "contexts/file/FileContext";
import Button from "components/Button";
import FormFieldsDetails from "components/FormFieldsDetails";

const ConvertPage = () => {
  const {
    state: { currentStep, fileData },
    actions: { reset },
  } = useContext<IFileContext>(FileContext);

  useEffect(() => {
    console.log("new file data is  ", fileData);
  }, [fileData]);

  return (
    <div className="flex items-center flex-col gap-6">
      <div className="flex items-center gap-2 justify-between w-full max-w-md">
        <h2 className="text-3xl font-medium">Select file to convert</h2>
        <Button onClick={reset} disabled={currentStep === "upload"}>
          Re Upload
        </Button>
      </div>
      {currentStep === "upload" && <FileForm />}
      {currentStep === "change" && <FormFieldsDetails />}
    </div>
  );
};

export default withLayout(ConvertPage);

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const token = ctx.req.cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
    },
  };
};
