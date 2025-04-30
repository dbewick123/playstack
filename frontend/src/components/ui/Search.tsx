import "./search.css";
import  SearchIcon from "../../assets/icons/search.svg?react";

const Search = () => {
  return (
    <div className="search-bar">
      <SearchIcon className="search-icon" />
      {/* TODO: pull data from rawg api for total games searchable */}
      <input type="text" placeholder="Search for any game in the world" />
    </div>
  );
};

export default Search;
