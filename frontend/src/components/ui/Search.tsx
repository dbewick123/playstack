import "./search.css";
import SearchIcon from "../../assets/icons/search.svg?react";
// import { useState } from "react";

interface SearchProps {
  handleOnChange: (queryString: string) => void;
  handleOnKeyPressed: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  queryValue: string;
}

const Search = ({ handleOnChange, handleOnKeyPressed, queryValue }: SearchProps) => {
  return (
    // TODO: Add a modal on cmd/ctrl K to open the search bar
    <div className="search-bar">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        value={queryValue}
        placeholder="Search for any game in the world"
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
        onKeyDown={(e) => handleOnKeyPressed(e)}
      />
    </div>
  );
};

export default Search;
