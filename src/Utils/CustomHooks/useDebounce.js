import { useState, useEffect } from "react";

const useDebounce = (initialValue = "", delayInMs = 1000) => {
  const [searchKeyword, setSearchKeyword] = useState(initialValue);

  useEffect(() => {
    const timeID = setTimeout(() => {
      setSearchKeyword(initialValue);
    }, delayInMs);

    return () => clearTimeout(timeID);
  }, [initialValue, delayInMs]);

  return searchKeyword;
};

export default useDebounce;
