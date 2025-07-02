import Search from "../ui/Search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setQuery, selectSearchQuery } from "../../store/slices/searchSlice";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const SearchWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const reduxQueryValue = useSelector(selectSearchQuery);

  const handleEnterPressed = (
    event: React.KeyboardEvent<HTMLInputElement>,
    queryValue: string
  ) => {
    if (event.key === "Enter") {
      dispatch(setQuery(queryValue));
    }
  };
  
  useEffect (() => {
    if(location.pathname.startsWith('/home')) {
      return;
    } else {
      navigate('/home')
    }
  }, [reduxQueryValue])

  return (
    <>
      <Search
        handleOnKeyPressed={handleEnterPressed}
      />
    </>
  );
};

export default SearchWrapper;
 