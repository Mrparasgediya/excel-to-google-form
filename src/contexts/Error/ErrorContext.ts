import { createContext, useContext } from "react";

export interface IErrorContext {
    state: {
        errorMessage: string | null
    },
    actions: {
        setErrorMessage: (message: string) => void
    }
}
const ErrorContext = createContext<IErrorContext>({
    state: {
        errorMessage: null
    },
    actions: {
        setErrorMessage: () => { }
    }
})

export default ErrorContext
