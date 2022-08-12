import FileContext, { IFileContext } from "contexts/file/FileContext";
import { useContext, useEffect } from "react";
import { dataTypes } from "types/file";
import { getFullTypeOfFileType } from "utils/file";
import Button from "./Button";
import DynamiOptions from "./DynamiOptions";
import FormFieldDetails from "./FormFieldDetails";

const FormFieldsDetailsList = () => {
  const {
    state: { fileData },
    actions: { setCurrentStep },
  } = useContext<IFileContext>(FileContext);

  return (
    <div className="glass glass--white p-4 w-96 flex flex-col gap-4">
      {fileData.map((item, idx) => (
        <FormFieldDetails formField={item} key={idx} fieldNo={idx + 1} />
      ))}

      <Button
        classes="self-center"
        onClick={() => setCurrentStep("createForm")}
      >
        Create Form
      </Button>
    </div>
  );
};

export default FormFieldsDetailsList;
