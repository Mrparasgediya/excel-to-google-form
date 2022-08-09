import React, {
  ChangeEventHandler,
  FC,
  ForwardedRef,
  forwardRef,
  Ref,
  useState,
} from "react";

interface IFileInputProps {
  inputProps?: {
    disabled?: boolean;
    accept?: string;
  };
  ref: Ref<HTMLInputElement>;
}

const FileInput: FC<IFileInputProps> = forwardRef<
  HTMLInputElement,
  IFileInputProps
>(({ inputProps }, forwardedRef: ForwardedRef<HTMLInputElement>) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isValidFile, setIsValidFile] = useState<boolean>(true);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsValidFile(true);
    const selectedFile = (e.target.files && e.target?.files[0]) || null;
    if (selectedFile) {
      if (inputProps && inputProps.accept) {
        const isValidFileAccept: boolean = inputProps.accept
          .split(",")
          .some((currentExtension) =>
            selectedFile.name.endsWith(currentExtension)
          );
        if (isValidFileAccept) {
          setSelectedFileName(selectedFile.name);
        } else {
          setSelectedFileName(
            `Please select only file with given extensions ${inputProps.accept}`
          );
          setIsValidFile(false);
        }
      }
    } else {
      setSelectedFileName("");
    }
  };

  return (
    <div
      className={`h-60 w-64 glass p-2 ${
        !isValidFile ? "glass--red" : "glass-white"
      } relative flex items-center justify-center ${
        inputProps?.disabled ? "bg-gray-500/60" : ""
      }`}
    >
      <input
        ref={forwardedRef}
        onChange={handleInputChange}
        type="file"
        className="absolute z-10 opacity-0 cursor-pointer inset-0 disabled:cursor-not-allowed"
        {...inputProps}
      />
      <span className="font-medium text-center px-2">
        {!!selectedFileName && isValidFile
          ? `Selected File ${selectedFileName}`
          : selectedFileName || `Drag and drop file or select file`}
      </span>
    </div>
  );
});

export default FileInput;
