import { createContext } from "react";
import { IFormItem } from "types/file";

export type fileContextCurrentSteps = 'upload' | "change" | "createForm" | 'addFormFields';

export interface IFileContextActions {
    setCurrentStep: (currentStep: fileContextCurrentSteps) => void;
    setFileData: (fileData: IFormItem[]) => void
    setFormDetails: (formDetails: IFormDetails) => void
    reset: () => void,
    toggelIsLoading: () => void
}

export interface IFormDetails {
    title: string,
    documentTitle: string;
    formId: string,
    formUrl: string
}

export interface IFileContext {
    state: {
        currentStep: fileContextCurrentSteps,
        fileData: IFormItem[],
        formDetails: IFormDetails,
        isLoading: boolean,
    },
    actions: IFileContextActions
}

const FileContext = createContext<IFileContext>({
    state: {
        isLoading: false,
        currentStep: 'upload',
        fileData: [],
        formDetails: { title: '', documentTitle: '', formUrl: '', formId: '' }
    },
    actions: {
        setCurrentStep: () => { },
        setFileData: () => { },
        reset: () => { },
        setFormDetails: () => { },
        toggelIsLoading: () => { }
    }
})

export default FileContext;