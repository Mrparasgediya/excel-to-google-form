import FileContext from "contexts/file/FileContext";
import {
  FC,
  FormEvent,
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
    actions: { setCurrentStep, setFileData },
  } = useContext(FileContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (fileInputRef.current && fileInputRef.current.files) {
      const selectedFile = fileInputRef.current.files[0];
      const formdata = new FormData();
      formdata.append("image", selectedFile);
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/file/upload", {
        body: formdata,
        method: "POST",
      });
      const response = await res.json();
      const fileData: IFormItem[] = response.readOutput;
      setFileData(fileData);
      setIsLoading(false);
      setCurrentStep("change");
    } else {
    }
  };

  return (
    <form
      className="glass glass-white py-8 px-2 w-96 flex items-center flex-col gap-4"
      onSubmit={handleFormSubmit}
    >
      <FileInput
        ref={fileInputRef}
        inputProps={{ disabled: isLoading, accept: ".xlsx" }}
      />
      <Button isLoading={isLoading} loadingText={"Getting File Details"}>
        Get File Data
      </Button>
    </form>
  );
};

export default FileForm;