import "./search.css";
import SearchIcon from "../../assets/icons/search.svg?react";
import { useState } from "react";

interface SearchProps {
  handleOnKeyPressed: (
    event: React.KeyboardEvent<HTMLInputElement>,
    queryValue: string
  ) => void;
}

const Search = ({ handleOnKeyPressed }: SearchProps) => {
  const [queryValue, setQueryValue] = useState("");

  return (
    // TODO: Add a modal on cmd/ctrl K to open the search bar
    <div className="search-bar">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        value={queryValue}
        placeholder="Search for any game in the world"
        onChange={(e) => {
          setQueryValue(e.target.value.replace(/^\s+/, ""));
        }}
        onKeyDown={(e) => handleOnKeyPressed(e, queryValue)}
      />
    </div>
  );
};

export default Search;
