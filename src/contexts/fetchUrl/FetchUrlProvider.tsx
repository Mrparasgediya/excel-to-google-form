import React, { FC, useState } from "react";
import FetchUrlContext from "./FetchUrlContext";

const FetchUrlCotextProvider: FC<{ children: any }> = ({ children }) => {
  const [baseFetchUrl, setBaseFetchUrl] = useState<string>("");
  return (
    <FetchUrlContext.Provider value={{ baseFetchUrl, setBaseFetchUrl }}>
      {children}
    </FetchUrlContext.Provider>
  );
};

export default FetchUrlCotextProvider;
