import "./search.css";
import  SearchIcon from "../../assets/icons/search.svg?react";

const Search = () => {
  return (
    // TODO: Add a modal on cmd/ctrl K to open the search bar
    <div className="search-bar">
      <SearchIcon className="search-icon" />
      <input type="text" placeholder="Search for any game in the world" />
    </div>
  );
};

export default Search;
