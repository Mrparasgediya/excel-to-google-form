import { FC, useEffect, useState } from "react";
import { ChildrenComponent } from "types/components.types";
import TokenContext, {
  ITokenContextActions,
  TokenContextType,
} from "./TokenContext";

const TokenContextProvider: FC<{ children: ChildrenComponent }> = ({
  children,
}) => {
  const [token, setToken] = useState<TokenContextType>(undefined);

  const actions: ITokenContextActions = {
    setToken: (token: TokenContextType) => {
      setToken(token);
    },
  };

  return (
    <TokenContext.Provider value={{ state: { token }, actions }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
