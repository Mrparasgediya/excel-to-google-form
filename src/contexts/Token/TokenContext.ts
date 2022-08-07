import { Context, createContext } from "react";


export type TokenContextType = string | undefined;

export interface ITokenContextActions {
    setToken: (token: TokenContextType) => void,
}

export interface TokenContextProps {
    state: { token: TokenContextType }
    actions: ITokenContextActions
}

const TokenContext: Context<TokenContextProps> = createContext<TokenContextProps>({
    state: { token: undefined },
    actions: {
        setToken: () => { }
    }
})

export default TokenContext;