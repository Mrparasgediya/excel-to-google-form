import React, { FC, Fragment } from "react";
import { dataTypes, IFormExtraFields } from "types/file";
import DynamicOptions from "./DynamicOptions";

const FieldDetailsWithInlineOptions: FC<{
  title: string;
  options: any[];
}> = ({ title, options }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3/12">{title}</div>
      <DynamicOptions
        classes="flex-1"
        options={options}
        optionsTitle={`All ${title}`}
      />
    </div>
  );
};

const DropDownAndRadioFieldExtraDetails: FC<IFormExtraFields> = ({
  shuffle,
  v,
}) => {
  return (
    <Fragment>
      <div>Shuffle Items: {String(!!shuffle)}</div>
      <FieldDetailsWithInlineOptions options={v!} title="Options" />
    </Fragment>
  );
};

const LinearScaleFieldExtraDetails: FC<IFormExtraFields> = ({
  highLabel,
  lowLabel,
  range: { low, high } = {},
}) => {
  return (
    <Fragment>
      {low && high ? (
        <div>
          Range: {low}-{high}
        </div>
      ) : null}
      <div>Low Label: {lowLabel}</div>
      <div>High Label: {highLabel}</div>
    </Fragment>
  );
};

const MultipleChoiceGridOrCheckboxGridFieldExtraDetails: FC<
  IFormExtraFields
> = ({ cols, v }) => {
  return (
    <Fragment>
      <FieldDetailsWithInlineOptions options={v!} title="Questions" />
      <FieldDetailsWithInlineOptions options={cols!} title="Columns" />
    </Fragment>
  );
};
const FormFieldExtraDetails: FC<{
  extra: IFormExtraFields | undefined;
  fieldType: dataTypes;
}> = ({ extra, fieldType }) => {
  if (!extra || !Object.keys(extra).length) {
    return null;
  }
  if (fieldType === "dd" || fieldType === "r") {
    return <DropDownAndRadioFieldExtraDetails {...extra} />;
  }
  if (fieldType === "ls") {
    return <LinearScaleFieldExtraDetails {...extra} />;
  }
  if (fieldType === "mcg" || fieldType === "cg") {
    return <MultipleChoiceGridOrCheckboxGridFieldExtraDetails {...extra} />;
  }
  return null;
};

export default FormFieldExtraDetails;
