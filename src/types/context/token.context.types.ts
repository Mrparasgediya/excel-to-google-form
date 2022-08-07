export type TokenContextType = string | undefined;

export interface ITokenContextActions {
    setToken: (token: TokenContextType) => void,
}

export interface TokenContextProps {
    state: { token: TokenContextType }
    actions: ITokenContextActions
}