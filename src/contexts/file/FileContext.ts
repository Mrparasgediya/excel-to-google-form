import { createContext } from "react";
import { IFormItem } from "types/file";

export type fileContextCurrentSteps = 'upload' | "change"
export interface IFileContextActions {
    setCurrentStep: (currentStep: fileContextCurrentSteps) => void;
    setFileData: (fileData: IFormItem[]) => void
}
export interface IFileContext {
    state: {
        currentStep: fileContextCurrentSteps,
        fileData: IFormItem[]
    }
    ,
    actions: IFileContextActions
}

const FileContext = createContext<IFileContext>({
    state: {
        currentStep: 'upload',
        fileData: []
    },
    actions: {
        setCurrentStep: () => { },
        setFileData: () => { }
    }
})

export default FileContext;