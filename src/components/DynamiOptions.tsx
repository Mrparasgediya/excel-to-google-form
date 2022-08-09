import { FC, Fragment, useState } from "react";
import Button from "./Button";
import PencilIcon from "./PencilIcon";
import TrashIcon from "./TrashIcon";

const DynamiOptions: FC<{ options: string[] }> = ({ options }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div className="relative w-60 h-10 ">
      <div
        onClick={() => setToggle(!toggle)}
        className="h-10 flex items-center justify-between px-2 cursor-pointer glass glass--white"
      >
        <span className="text-md">Options</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${
            toggle ? "-rotate-180" : "rotate-0"
          }  transition-transform ease-in duration-200`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {toggle && (
        <div className="absolute glass glass--white backdrop-blur-lg left-0 top-11  w-full z-50 flex flex-col ">
          {options.map((currOption, idx) => (
            <div
              key={idx}
              className="h-10 px-2 py-1 rounded-none border-0 border-b border-b-gray-400 last:border-0 flex items-center gap-1 hover:bg-white/90 transition-colors ease-in"
            >
              <span className="flex-1 text-sm">{currOption}</span>
              {/* <Button color="green" hasShadows={false}>
                  <PencilIcon />
                </Button>
                <Button color="red" hasShadows={false}>
                  <TrashIcon />
                </Button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamiOptions;
