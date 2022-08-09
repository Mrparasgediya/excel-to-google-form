import { FC, useEffect, useState } from "react";
import { IFormItem } from "types/file";
import FileContext, {
  fileContextCurrentSteps,
  IFileContextActions,
  IFormDetails,
} from "./FileContext";

const FileContextProvider: FC<{ children: any }> = ({ children }) => {
  const defaultFormDetails = {
    documentTitle: "",
    title: "",
    formId: "",
    formUrl: "",
  };

  const [currentStep, setCurrentStep] =
    useState<fileContextCurrentSteps>("upload");
  const [fileData, setFileData] = useState<IFormItem[]>([]);
  const [formDetails, setFormDetails] =
    useState<IFormDetails>(defaultFormDetails);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const actions: IFileContextActions = {
    setCurrentStep(currentStep) {
      setCurrentStep(currentStep);
    },
    toggelIsLoading() {
      setIsLoading((prevState) => !prevState);
    },
    setFileData(fileData) {
      setFileData(fileData);
    },
    reset() {
      setCurrentStep("upload");
      setFileData([]);
      setFormDetails(defaultFormDetails);
    },
    setFormDetails(newFormDetails: IFormDetails) {
      setFormDetails(newFormDetails);
    },
  };

  return (
    <FileContext.Provider
      value={{
        state: { currentStep, fileData, formDetails, isLoading },
        actions,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
