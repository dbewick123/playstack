import "./header.css";

import { useState, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joystick from "../../assets/logos/joystick.svg?react";
import SearchWrapper from "../containers/SearchWrapper";
import AuthModal from "./AuthModal";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  selectUser,
  selectIsLoggedIn,
  logoutUser,
} from "../../store/slices/userSlice";
import useMenu from "../../hooks/useMenu";

export default function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const accountMenuId = useId();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  const { anchorEl, open, openMenu, closeMenu } = useMenu();

  return (
    <div className="header-content">
      <Link className="header-logo" to="/home">
        <Joystick className="header-logo-svg" />
        <span className="header-logo-text">playstack</span>
      </Link>
      <div className="header-search">
        <SearchWrapper />
      </div>
      <nav className="header-links">
        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/home"
        >
          Home
        </Link>
        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/landing"
        >
          About
        </Link>
        {isLoggedIn ? (
          <>
            <button className="header-user-btn" onClick={openMenu}>
              <AccountCircle className="header-user-icon" />
              <span>{user?.username}</span>
            </button>
            <Menu
              id={accountMenuId}
              anchorEl={anchorEl}
              open={open}
              onClose={closeMenu}
            >
              <MenuItem onClick={() => navigate('/dashboard')}>My Dashboard</MenuItem>
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <button
            className="header-signin-btn"
            onClick={() => setAuthModalOpen(true)}
          >
            Login
          </button>
        )}
      </nav>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
