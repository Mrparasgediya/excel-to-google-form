import { Context, createContext } from "react";
import { TokenContextProps } from "types/context/token.context.types";

const TokenContext: Context<TokenContextProps> = createContext<TokenContextProps>({
    state: { token: undefined },
    actions: {
        setToken: () => { }
    }
})

export default TokenContext;