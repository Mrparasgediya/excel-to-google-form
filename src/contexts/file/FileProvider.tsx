import { FC, useState } from "react";
import { IFormItem } from "types/file";
import FileContext, {
  fileContextCurrentSteps,
  IFileContextActions,
} from "./FileContext";

const FileContextProvider: FC<{ children: any }> = ({ children }) => {
  const [currentStep, setCurrentStep] =
    useState<fileContextCurrentSteps>("upload");
  const [fileData, setFileData] = useState<IFormItem[]>([]);

  const actions: IFileContextActions = {
    setCurrentStep(currentStep) {
      setCurrentStep(currentStep);
    },
    setFileData(fileData) {
      setFileData(fileData);
    },
  };
  return (
    <FileContext.Provider value={{ state: { currentStep, fileData }, actions }}>
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
