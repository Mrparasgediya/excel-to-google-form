import React, { FC, useEffect } from "react";
import { IFormItem } from "types/file";
import { getFullTypeOfFileType } from "utils/file";
import FormFieldExtraDetails from "./FormFieldExtraDetails";

const FormFieldDetails: FC<{ formField: IFormItem; fieldNo: number }> = ({
  formField: { type, extra: { required, ...otherExtraProps } = {}, title },
  fieldNo,
}) => {
  return (
    <div className="space-y-1">
      <h3 className="font-semibold">Field {fieldNo}:</h3>
      <div>Title: {title}</div>
      <div>Type: {`${getFullTypeOfFileType(type)}`}</div>
      <div>Required: {String(!!required)}</div>
      <FormFieldExtraDetails extra={otherExtraProps} fieldType={type} />
    </div>
  );
};

export default FormFieldDetails;
