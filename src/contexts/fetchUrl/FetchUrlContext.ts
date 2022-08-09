import { createContext } from "react";

export interface IFetchUrlContextProps { baseFetchUrl: string, setBaseFetchUrl: (baseFetchUrl: string) => void }

const FetchUrlContext = createContext<IFetchUrlContextProps>({
    baseFetchUrl: "",
    setBaseFetchUrl: () => { }
})

export default FetchUrlContext