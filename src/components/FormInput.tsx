import React, { FC, ForwardedRef, forwardRef, Ref } from "react";

interface IFormInputProps {
  type: "text" | "email" | "number" | "tel";
  id: string;
  label: string;
  name?: string;
  required?: boolean;
  ref: Ref<HTMLInputElement>;
  disabled?: boolean;
}

const FormInput: FC<IFormInputProps> = forwardRef<
  HTMLInputElement,
  IFormInputProps
>(
  (
    { type, id, label, ...otherInputProps },
    forwardedRef: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-medium text-md" htmlFor={id}>
          {label}
        </label>
        <input
          {...otherInputProps}
          type={type}
          id={id}
          className={`px-4 py-2 rounded-md border border-gray-600/40 focus:outline-none focus:ring-2 focus:ring-blue-600/20`}
          ref={forwardedRef}
        />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
