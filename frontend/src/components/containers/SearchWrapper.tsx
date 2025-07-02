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
    queryValue: string
  ) => {
    if (event.key === "Enter") {
      dispatch(setQuery(queryValue));
      if (!location.pathname.startsWith("/home")) {
        navigate("/home");
      }
    }
  };

  return (
    <>
      <Search handleOnKeyPressed={handleEnterPressed} />
    </>
  );
};

export default SearchWrapper;
