import { createContext } from "react";

export interface IDisableLogoutContext {
    state: {
        isLogoutDisabled: boolean;
    }
    ,
    actions: {
        toggleDisableLogout: () => void;
    }
}

const DisableLogoutContext = createContext<IDisableLogoutContext>({
    state: {
        isLogoutDisabled: false,
    },
    actions: {
        toggleDisableLogout: () => { }
    }
})

export default DisableLogoutContext