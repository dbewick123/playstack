import Search from "../ui/Search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  setQuery,
  selectSearchQuery,
  fetchSearchResults,
} from "../../store/slices/searchSlice";

const SearchWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector(selectSearchQuery);

  const handleOnChange = (queryString: string) => {
    dispatch(setQuery(queryString));
  };

  const handleOnKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(fetchSearchResults());
    }
  };

  return (
    <>
      <Search
        handleOnChange={handleOnChange}
        handleOnKeyPressed={handleOnKeyPressed}
        //TODO: This feels kinda janky too, I think i should cache the state and only search once I hit enter? or maybe don't subscribe the search component to the selector so that specificalyn doesnt rerender
        queryValue={searchQuery}
      />
    </>
  );
};

export default SearchWrapper;
