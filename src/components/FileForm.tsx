import config from "config";
import DisableLogoutContext from "contexts/disableLogout/DisableLogoutContext";
import FileContext from "contexts/file/FileContext";
import TokenContext from "contexts/token/TokenContext";
import { FormEventHandler, useContext, useRef, useState } from "react";
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

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (fileInputRef.current && fileInputRef.current.files) {
      const selectedFile = fileInputRef.current.files[0];
      const formdata = new FormData();
      formdata.append("file", selectedFile);
      toggelIsLoading();
      toggleDisableLogout();
      try {
        const res = await fetch(`${config.FETCH_BASE_URL}/api/file/upload`, {
          body: formdata,
          method: "POST",
          headers: new Headers({
            Authorization: `Barear ${token}`,
          }),
        });
        const response = await res.json();
        const fileData: IFormItem[] = response.readOutput;
        setFileData(fileData);
        setCurrentStep("change");
      } catch (error) {
        console.log(error);
      }
      toggleDisableLogout();
      toggelIsLoading();
    } else {
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
