import FileContext, {
  IFileContext,
  IFormDetails,
} from "contexts/file/FileContext";
import TokenContext from "contexts/token/TokenContext";
import React, {
  FC,
  FormEventHandler,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import Button from "./Button";
import FormInput from "./FormInput";

const GoogleFormDetails = () => {
  const {
    state: { token },
  } = useContext(TokenContext);
  const {
    state: { isLoading },
    actions: { toggelIsLoading },
  } = useContext<IFileContext>(FileContext);
  const documentTitleInputRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const titleInputRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const {
    actions: { setFormDetails, setCurrentStep },
  } = useContext<IFileContext>(FileContext);

  const handleCreteGoogleFormSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (documentTitleInputRef.current && titleInputRef.current) {
      const documentTitle: string | undefined =
        documentTitleInputRef.current.value;
      const title: string | undefined = titleInputRef.current.value;
      try {
        toggelIsLoading();
        if (!documentTitle || !title)
          throw new Error("Enter valid form details");
        const res = await fetch(
          `https://excel-to-google-form.vercel.app/api/form/create`,
          {
            method: "POST",
            body: JSON.stringify({
              title: title,
              documentTitle: documentTitle,
            }),
            headers: new Headers({
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Barear ${token}`,
            }),
          }
        );
        const response = await res.json();
        setFormDetails({
          documentTitle,
          title,
          formId: response.formId,
          formUrl: response.responderUri,
        } as IFormDetails);
        titleInputRef.current.value = "";
        documentTitleInputRef.current.value = "";
        toggelIsLoading();
        setCurrentStep("addFormFields");
      } catch (error) {
        console.log(error);
        toggelIsLoading();
      }
    }
  };

  return (
    <form
      onSubmit={handleCreteGoogleFormSubmit}
      className="glass glass--white px-4 py-2 font-md flex flex-col gap-4"
    >
      <FormInput
        type="text"
        ref={documentTitleInputRef}
        required
        id="formDocumentTitle"
        label="Form Document Title"
        name="formDocumentTitle"
        disabled={isLoading}
      />
      <FormInput
        type="text"
        ref={titleInputRef}
        required
        id="formTitle"
        label="Form Title"
        name="formTitle"
        disabled={isLoading}
      />
      <Button
        type="submit"
        isLoading={isLoading}
        loadingText="Creating google form"
        classes="self-center"
      >
        Create Google Form
      </Button>
    </form>
  );
};

export default GoogleFormDetails;
