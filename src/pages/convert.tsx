import withLayout from "components/withLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { FC, useContext, useEffect } from "react";
import FileForm from "components/FileForm";
import FileContext, { IFileContext } from "contexts/file/FileContext";
import Button from "components/Button";
import FormFieldsDetails from "components/FormFieldsDetails";
import GoogleFormDetails from "components/GoogleFormDetails";
import AddFormFields from "components/AddFormFields";
import config from "config";

const ConvertPage: FC<{ token: string }> = ({ token }) => {
  const {
    state: { currentStep, isLoading },
    actions: { reset },
  } = useContext<IFileContext>(FileContext);

  return (
    <div className="flex items-center flex-col gap-6">
      <div className="flex items-center gap-2 justify-between w-full max-w-md">
        <h2 className="text-3xl font-medium">Select file to convert</h2>
        <Button
          onClick={reset}
          disabled={
            currentStep === "upload" ||
            currentStep === "addFormFields" ||
            isLoading
          }
        >
          Re Upload
        </Button>
      </div>
      {currentStep === "upload" && <FileForm />}
      {currentStep === "change" && <FormFieldsDetails />}
      {currentStep === "createForm" && <GoogleFormDetails />}
      {currentStep === "addFormFields" && <AddFormFields />}
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
