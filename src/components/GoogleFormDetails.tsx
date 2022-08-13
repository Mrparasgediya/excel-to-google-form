import config from "config";
import DisableLogoutContext from "contexts/disableLogout/DisableLogoutContext";
import ErrorContext from "contexts/Error/ErrorContext";
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
import { IFetchResponse } from "types/fetch.types";
import Button from "./Button";
import FormInput from "./FormInput";

const GoogleFormDetails = () => {
  const {
    state: { token },
  } = useContext(TokenContext);
  const {
    actions: { toggleDisableLogout },
  } = useContext(DisableLogoutContext);
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

  const {
    actions: { setErrorMessage },
  } = useContext(ErrorContext);

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
        toggleDisableLogout();
        if (!documentTitle || !title)
          throw new Error("Enter valid form details");
        const createFormResponse: IFetchResponse = await fetch(
          `${config.FETCH_BASE_URL}/api/form/create`,
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
        ).then((res) => res.json());

        if (createFormResponse.error) {
          throw new Error(createFormResponse.error);
        }

        setFormDetails({
          documentTitle,
          title,
          formId: createFormResponse.formId,
          formUrl: createFormResponse.responderUri,
        } as IFormDetails);
        titleInputRef.current.value = "";
        documentTitleInputRef.current.value = "";
        toggelIsLoading();
        toggleDisableLogout();
        setCurrentStep("addFormFields");
      } catch (error) {
        setErrorMessage((error as Error).message);
        toggelIsLoading();
        toggleDisableLogout();
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
