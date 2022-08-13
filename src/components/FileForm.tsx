import config from "config";
import DisableLogoutContext from "contexts/disableLogout/DisableLogoutContext";
import ErrorContext from "contexts/Error/ErrorContext";
import FileContext from "contexts/file/FileContext";
import TokenContext from "contexts/token/TokenContext";
import { FormEventHandler, useContext, useRef, useState } from "react";
import { IFetchResponse } from "types/fetch.types";
import { IFormItem } from "types/file";
import Button from "./Button";
import FileInput from "./FileInput";

const FileForm = () => {
  const {
    state: { isLoading },
    actions: { setCurrentStep, setFileData, toggelIsLoading },
  } = useContext(FileContext);

  const {
    actions: { toggleDisableLogout },
  } = useContext(DisableLogoutContext);

  const [isValidFormSubmit, setIsValidFormSubmit] = useState<boolean>(false);
  const {
    state: { token },
  } = useContext(TokenContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    actions: { setErrorMessage },
  } = useContext(ErrorContext);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (fileInputRef.current && fileInputRef.current.files) {
      const selectedFile = fileInputRef.current.files[0];
      const formdata = new FormData();
      formdata.append("file", selectedFile);
      toggelIsLoading();
      toggleDisableLogout();
      try {
        const uploadResponse: IFetchResponse = await fetch(
          `${config.FETCH_BASE_URL}/api/file/upload`,
          {
            body: formdata,
            method: "POST",
            headers: new Headers({
              Authorization: `Barear ${token}`,
            }),
          }
        ).then((res) => res.json());

        if (uploadResponse.error) {
          throw new Error(uploadResponse.error);
        }

        const fileData: IFormItem[] = uploadResponse.readOutput;
        setFileData(fileData);
        setCurrentStep("change");
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
      toggleDisableLogout();
      toggelIsLoading();
    } else {
      setErrorMessage("Please refresh The page");
    }
  };

  return (
    <form
      className="glass glass--white py-8 px-2 w-96 flex items-center flex-col gap-4"
      onSubmit={handleFormSubmit}
    >
      <FileInput
        ref={fileInputRef}
        inputProps={{
          disabled: isLoading,
          accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          onChange: (_, isvalidFile: boolean) => {
            setIsValidFormSubmit(isvalidFile);
          },
        }}
      />
      <Button
        isLoading={isLoading}
        loadingText={"Getting File Details"}
        disabled={!isValidFormSubmit}
      >
        Get File Data
      </Button>
    </form>
  );
};

export default FileForm;
