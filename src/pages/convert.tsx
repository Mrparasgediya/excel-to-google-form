import withLayout from "components/withLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";

const ConvertPage = () => {
  return <div>ConvertPage</div>;
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
