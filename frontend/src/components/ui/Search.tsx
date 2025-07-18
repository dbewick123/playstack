import "./search.css";
import SearchIcon from "../../assets/icons/search.svg?react";
import ClearIcon from "../../assets/icons/clear-icon.svg?react";
import { useState } from "react";

interface SearchProps {
  handleOnKeyPressed: (
    event: React.KeyboardEvent<HTMLInputElement>,
    queryValue: string
  ) => void;
  handleOnClearClicked: (queryValue: string) => void;
}

const Search = ({ handleOnKeyPressed, handleOnClearClicked }: SearchProps) => {
  const [queryValue, setQueryValue] = useState("");

  return (
    // TODO: Add a modal on cmd/ctrl K to open the search bar
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
