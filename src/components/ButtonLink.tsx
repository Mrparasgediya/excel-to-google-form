import React, { FC } from "react";
import NextLink from "next/link";

const ButtonLink: FC<{
  children: JSX.Element;
  href: string;
}> = ({ children, href }) => {
  return (
    <NextLink href={href}>
      <a>{children}</a>
    </NextLink>
  );
};

export default ButtonLink;
