import React, { FC, MouseEvent } from "react";
import NextLink from "next/link";

const ButtonLink: FC<{
  children: JSX.Element;
  href: string;
  onClick?: () => void;
  classes?: string;
  target?: "_blank";
}> = ({ children, classes, href, ...otherProps }) => {
  if (classes) {
    (otherProps as { [key: string]: any; className: string }).className =
      classes;
  }
  return (
    <NextLink href={href} passHref>
      <a {...otherProps}>{children}</a>
    </NextLink>
  );
};

export default ButtonLink;
