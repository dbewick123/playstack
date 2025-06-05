import Search from "../ui/Search";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setQuery, fetchSearchResults } from "../../store/slices/searchSlice";

const SearchWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleEnterPressed = (
    event: React.KeyboardEvent<HTMLInputElement>,
    queryValue: string
  ) => {
    if (event.key === "Enter") {
      dispatch(setQuery(queryValue));
      dispatch(fetchSearchResults());
    }
  };

  return (
    <>
      <Search
        handleOnKeyPressed={handleEnterPressed}
      />
    </>
  );
};

export default SearchWrapper;
