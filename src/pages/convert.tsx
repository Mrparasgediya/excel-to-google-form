import withLayout from "components/withLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { Fragment, useContext, useEffect } from "react";
import FileForm from "components/FileForm";
import FileContext, { IFileContext } from "contexts/file/FileContext";

const ConvertPage = () => {
  const {
    state: { currentStep, fileData },
  } = useContext<IFileContext>(FileContext);

  useEffect(() => {
    console.log("new file data is  ", fileData);
  }, [fileData]);

  return (
    <div className="flex items-center flex-col gap-6">
      {currentStep === "upload" && (
        <Fragment>
          <h2 className="text-3xl font-medium">Select File To Convert</h2>
          <FileForm />
        </Fragment>
      )}
      {currentStep === "change" && <div>This is change step</div>}
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
