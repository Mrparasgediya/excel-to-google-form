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
  };
  const [currentStep, setCurrentStep] =
    useState<fileContextCurrentSteps>("upload");
  const [fileData, setFileData] = useState<IFormItem[]>([]);
  const [formDetails, setFormDetails] =
    useState<IFormDetails>(defaultFormDetails);

  // setting setting for development of change
  useEffect(() => {
    setCurrentStep("upload");
    setFileData([]);
  }, []);

  const actions: IFileContextActions = {
    setCurrentStep(currentStep) {
      setCurrentStep(currentStep);
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
      value={{ state: { currentStep, fileData, formDetails }, actions }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
