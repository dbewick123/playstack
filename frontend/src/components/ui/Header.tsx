import "./header.css";

import { Link } from "react-router-dom";
import Joystick from "../../assets/logos/joystick.svg?react";
import SearchWrapper from "../containers/SearchWrapper";

export default function Header() {
  
  return (
    <div className="header-content">
      <div className="header-logo">
        <Joystick className="header-logo-svg" />
        <span className="header-logo-text">playstack</span>
      </div>
      <div className="header-search"><SearchWrapper /></div>
      <nav className="header-links">
        <Link to="/home">Home</Link>
        <Link to="/library">My Library</Link>
        <Link to="/landing">Product</Link>
      </nav>
    </div>
  );
}
 