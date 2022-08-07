import { FC } from "react";
import { ChildrenComponent } from "types/components.types";

const Container: FC<{ children: ChildrenComponent; classes?: string }> = ({
  children,
  classes,
}) => {
  return <div className={`w-8/12 mx-auto ${classes || ""}`}>{children}</div>;
};

export default Container;
