import Button from "components/Button";
import ButtonLink from "components/ButtonLink";
import withLayout from "components/withLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="space-y-4 glass glass--white p-4">
      <h2 className="font-bold text-3xl">Excel To Google Form Converter</h2>
      <h3 className="font-smibold text-xl">
        Notes To Remember for preparing excel file
      </h3>
      <ul className="space-y-2 font-normal text-md">
        <li>
          Row 1: must contain heading only which will be field name for form
        </li>
        <li>
          <span>Row 2: should be empty or has following details</span>
          <ul className="list-disc ml-16 space-y-2">
            <li>
              For Radio Button:{" "}
              <em className="font-medium">
                t=radio;v=(radio option seperated by comma(,));
              </em>
              (Ex: t=radio;v=male,female;)
            </li>
            <li>
              For Drop Down:{" "}
              <em className="font-medium">
                t=dropdown;v=(drop down option seperated by comma(,));
              </em>{" "}
              (Ex: t=dropdown;v=Ahmedabad,Surat,Baroda;)
            </li>
            <li>
              For Check box:{" "}
              <em className="font-medium">
                t=checkbox;v=(checkbox option seperated by comma(,));
              </em>{" "}
              (Ex: t=checkbox;v=Reading,Gaming,Walking,Singing;)
            </li>
          </ul>
        </li>
        <li>
          From Row 3: your data values{" "}
          <em className="font-medium">
            (Note: you must need to enter one record)
          </em>
        </li>
      </ul>
      <ButtonLink href="/convert">
        <Button classes="mt-6">Convert Excel To Form</Button>
      </ButtonLink>
    </div>
  );
};

export default withLayout(Home);
