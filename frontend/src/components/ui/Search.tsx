import "./search.css";
import SearchIcon from "../../assets/icons/search.svg?react";
import ClearIcon from "../../assets/icons/clear-icon.svg?react";
import { useState, useEffect } from "react";

interface SearchProps {
  handleOnKeyPressed: (
    event: React.KeyboardEvent<HTMLInputElement>,
    queryValue: string
  ) => void;
  handleOnClearClicked: (queryValue: string) => void;
  handleDebouncedInputFired: (debouncedInput: string) => void;
}

const Search = ({ handleOnKeyPressed, handleOnClearClicked, handleDebouncedInputFired }: SearchProps) => {
  const [queryValue, setQueryValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputValue(queryValue);
    }, 500);
  
    return () => {
      clearTimeout(handler);
    };
  }, [queryValue]);

  useEffect(() => {
    if (debouncedInputValue) {
      handleDebouncedInputFired(debouncedInputValue)
    }
  }, [debouncedInputValue
  ]);

  return (
    <div className="search-bar">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        aria-label="userSearch"
        value={queryValue}
        placeholder="Search for any game in the world"
        onChange={(e) => {
          setQueryValue(e.target.value.replace(/^\s+/, ""));
        }}
        onKeyDown={(e) => handleOnKeyPressed(e, queryValue)}
      />
      <ClearIcon
        className="search-clear"
        onClick={() => {
          setQueryValue("");
          handleOnClearClicked("");
        }}
      />
    </div>
  );
};

export default Search;
