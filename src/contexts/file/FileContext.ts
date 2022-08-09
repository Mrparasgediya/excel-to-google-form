import { createContext } from "react";
import { IFormItem } from "types/file";

export type fileContextCurrentSteps = 'upload' | "change" | "createForm";

export interface IFileContextActions {
    setCurrentStep: (currentStep: fileContextCurrentSteps) => void;
    setFileData: (fileData: IFormItem[]) => void
    setFormDetails: (formDetails: IFormDetails) => void
    reset: () => void
}

export interface IFormDetails {
    title: string,
    documentTitle: string;
}

export interface IFileContext {
    state: {
        currentStep: fileContextCurrentSteps,
        fileData: IFormItem[]
        formDetails: IFormDetails
    }
    ,
    actions: IFileContextActions
}

const FileContext = createContext<IFileContext>({
    state: {
        currentStep: 'upload',
        fileData: [],
        formDetails: { title: '', documentTitle: '' }
    },
    actions: {
        setCurrentStep: () => { },
        setFileData: () => { },
        reset: () => { },
        setFormDetails: () => { },
    }
})

export default FileContext;