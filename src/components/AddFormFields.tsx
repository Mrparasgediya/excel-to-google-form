import FileContext, { IFileContext } from "contexts/file/FileContext";
import TokenContext from "contexts/token/TokenContext";
import React, { useContext, useState } from "react";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import LoadingSpinner from "./LoadingSpinner";

const AddFormFields = () => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
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
    actions: { reset },
  } = useContext<IFileContext>(FileContext);

  const handleAddFieldClick = async () => {
    try {
      toggelIsLoading();
      const res = await fetch(
        `https://excel-to-google-form.vercel.app/api/form/${formId}/fields`,
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
        {!isCompleted && !isLoading && (
          <Button onClick={handleAddFieldClick}>Add Fields to Form</Button>
        )}
        {isCompleted && (
          <ButtonLink href={formUrl} onClick={reset} target="_blank">
            <Button>See Form</Button>
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

export default AddFormFields;
