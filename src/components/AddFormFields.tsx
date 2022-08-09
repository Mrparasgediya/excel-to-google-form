import FileContext, {
  IFileContext,
  IFormDetails,
} from "contexts/file/FileContext";
import TokenContext from "contexts/token/TokenContext";
import React, { FC, useContext, useEffect, useState } from "react";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import LoadingSpinner from "./LoadingSpinner";

const AddFormFields: FC<{}> = ({}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    state: { token },
  } = useContext(TokenContext);
  const {
    state: { isLoading },
    actions: { toggelIsLoading },
  } = useContext<IFileContext>(FileContext);

  const {
    state: {
      formDetails: { formUrl, formId },
      fileData,
    },
  } = useContext<IFileContext>(FileContext);

  useEffect(() => {
    const addFieldsToForm = async () => {
      try {
        toggelIsLoading();
        const res = await fetch(
          `http://localhost:3000/api/form/${formId}/fields`,
          {
            method: "PUT",
            body: JSON.stringify({ fields: fileData }),
            headers: new Headers({
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Barear ${token}`,
            }),
          }
        );
        toggelIsLoading();
        setIsCompleted(true);
      } catch (error) {
        console.log(error);
        toggelIsLoading();
      }
    };
    addFieldsToForm();
  }, []);

  return (
    <div className="glass glass--white h-60 w-60 ">
      <div className="flex flex-col h-full w-full justify-center gap-4 items-center">
        {isLoading && <LoadingSpinner size="extraLarge" />}
        <span
          className={`text-lg font-medium capitalize ${
            isCompleted ? "text-green-600 " : ""
          }`}
        >
          {isCompleted ? `form created successfully` : `Adding fields To Form`}
        </span>
        {isCompleted && (
          <ButtonLink href={formUrl} target="_blank">
            <Button>See Form</Button>
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

export default AddFormFields;
