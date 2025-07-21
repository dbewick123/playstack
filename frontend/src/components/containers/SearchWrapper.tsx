import Search from "../ui/Search";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setQuery } from "../../store/slices/searchSlice";
import { useNavigate, useLocation } from "react-router-dom";

const SearchWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const handleEnterPressed = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      if (!location.pathname.startsWith("/home")) {
        navigate("/home");
      }
    }
  };

  const handleOnClearClicked = (
    queryValue: string
  ) => {
    dispatch(setQuery(queryValue));
  };

  const handleDebouncedInputFired = (debouncedInput: string) => {
    dispatch(setQuery(debouncedInput))
  }

  return (
    <>
      <Search handleOnKeyPressed={handleEnterPressed} handleOnClearClicked={handleOnClearClicked} handleDebouncedInputFired={handleDebouncedInputFired} />
    </>
  );
};

export default SearchWrapper;
