import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store/store";
import { clearUser } from "../../store/slices/userSlice";
import Search from "./Search";

export default function Navbar() {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  if (loading) {
    return null; // TODO: Implement a loading spinner component here
  }

  return (
    <>
      <div className="navbar-logo">Playstack</div>
      {user ? (
        <div className="navbar-search">
          <Search />
        </div>
      ) : (
        <></>
      )}
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/library">Library</Link>
        <Link to="/wishlist">Wishlist</Link>
        <button onClick={() => dispatch(clearUser())}>Logout</button>
      </nav>
    </>
  );
}
