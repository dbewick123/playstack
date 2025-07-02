import "./header.css";

import { Link } from "react-router-dom";
import Joystick from "../../assets/logos/joystick.svg?react";
import SearchWrapper from "../containers/SearchWrapper";

export default function Header() {
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
      </nav>
    </div>
  );
}
