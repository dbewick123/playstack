import "./header.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store/store";
import { clearUser } from "../../store/slices/userSlice";
import Search from "./Search";
import Joystick from "../../assets/logos/joystick.svg?react";

export default function Header() {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  if (loading) {
    return null; // TODO: Implement a loading spinner component here
  }
  return (
    <>
      
      <div className="header-logo">
        <Joystick className="header-logo-svg" />
        <span className="header-logo-text">playstack</span>
      </div>
      <div className="header-search">{user && <Search />}</div>
      <nav className="header-links">
        <Link to="/">home</Link>
        <Link to="/library">library</Link>
        <Link to="/wishlist">wishlist</Link>
        {/* TODO: update to proper logout with nice button */}
        <button onClick={() => dispatch(clearUser())}>x</button>{" "}
      </nav>
    </>
  );
}
