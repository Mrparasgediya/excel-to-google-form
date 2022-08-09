import config from "config";
import FileContext from "contexts/file/FileContext";
import {
  ChangeEvent,
  FormEventHandler,
  useContext,
  useRef,
  useState,
} from "react";
import { IFormItem } from "types/file";
import Button from "./Button";
import FileInput from "./FileInput";

const FileForm = () => {
  const {
    state: { isLoading },
    actions: { setCurrentStep, setFileData, toggelIsLoading },
  } = useContext(FileContext);

  const [isValidFormSubmit, setIsValidFormSubmit] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (fileInputRef.current && fileInputRef.current.files) {
      const selectedFile = fileInputRef.current.files[0];
      const formdata = new FormData();
      formdata.append("image", selectedFile);
      toggelIsLoading();
      try {
        const res = await fetch(`${config.FETCH_BASE_URL}/api/file/upload`, {
          body: formdata,
          method: "POST",
        });
        const response = await res.json();
        const fileData: IFormItem[] = response.readOutput;
        setFileData(fileData);
        setCurrentStep("change");
      } catch (error) {
        console.log(error);
      }
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
          accept: ".xlsx",
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
