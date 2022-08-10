import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  ForwardedRef,
  forwardRef,
  Ref,
  useState,
} from "react";
import { isValidFileAccept } from "utils/file";

interface IFileInputProps {
  inputProps?: {
    disabled?: boolean;
    accept?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>, isValidFile: boolean) => void;
  };
  ref: Ref<HTMLInputElement>;
}

const FileInput: FC<IFileInputProps> = forwardRef<
  HTMLInputElement,
  IFileInputProps
>(({ inputProps }, forwardedRef: ForwardedRef<HTMLInputElement>) => {
  const { onChange: handleInputChangeFromSuper, ...otherInputProps } =
    inputProps || {};
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isValidFile, setIsValidFile] = useState<boolean>(true);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsValidFile(true);
    const selectedFile = (e.target.files && e.target?.files[0]) || null;
    if (selectedFile) {
      if (inputProps && inputProps.accept) {
        const isFileToAccept = isValidFileAccept(selectedFile.name);
        if (isFileToAccept) {
          setSelectedFileName(selectedFile.name);
        } else {
          setSelectedFileName(
            `Please select only file with given extensions ${inputProps.accept}`
          );
          setIsValidFile(false);
        }
        if (handleInputChangeFromSuper) {
          handleInputChangeFromSuper(e, isFileToAccept);
        }
      }
    } else {
      setSelectedFileName("");
    }
  };

  return (
    <div
      className={`h-60 w-64 glass p-2 ${
        !isValidFile ? "glass--red" : "glass--white"
      } relative flex items-center justify-center ${
        inputProps?.disabled ? "bg-gray-500/60" : ""
      }`}
    >
      <input
        ref={forwardedRef}
        onChange={handleInputChange}
        type="file"
        className="absolute z-10 opacity-0 cursor-pointer inset-0 disabled:cursor-not-allowed"
        {...otherInputProps}
      />
      <span className="font-medium text-center px-2">
        {!!selectedFileName && isValidFile
          ? `Selected File ${selectedFileName}`
          : selectedFileName || `Drag and drop file or select file`}
      </span>
    </div>
  );
});

FileInput.displayName = "FileInput";

export default FileInput;
