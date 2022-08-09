import React, { FC, MouseEvent } from "react";
import NextLink from "next/link";

const ButtonLink: FC<{
  children: JSX.Element;
  href: string;
  onClick?: () => void;
  target?: "_blank";
}> = ({ children, href, ...otherProps }) => {
  return (
    <NextLink href={href} passHref>
      <a {...otherProps}>{children}</a>
    </NextLink>
  );
};

export default ButtonLink;
