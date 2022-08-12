import { FC, useState } from "react";
import { ChildrenComponent } from "types/components.types";
import DisableLogoutContext from "./DisableLogoutContext";

const DisableLogoutContextProvider: FC<{ children: ChildrenComponent }> = ({
  children,
}) => {
  const [isLogoutDisabled, setIsLogoutDisabled] = useState<boolean>(false);

  return (
    <DisableLogoutContext.Provider
      value={{
        state: {
          isLogoutDisabled,
        },
        actions: {
          toggleDisableLogout: () =>
            setIsLogoutDisabled((prevState) => !prevState),
        },
      }}
    >
      {children}
    </DisableLogoutContext.Provider>
  );
};

export default DisableLogoutContextProvider;
