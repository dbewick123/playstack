import { Link } from "react-router-dom";
import "./footer.css";
import GitHubIcon from "../../assets/logos/third-party/github.svg?react";
import SteamIcon from "../../assets/logos/third-party/steam.svg?react";
import LinkeInIcon from "../../assets/logos/third-party/linkedin.svg?react";

export default function Footer() {
  {
    /* TODO: Update footer info to real content */
  }
  return (
    <div className="footer-content">
      <div className="footer-info-container">
        <div className="footer-info footer-info-world">
          <h4>Playstack World</h4>
          {/* TODO: add real link paths to the footer link objects. Note they stay green when active */}
          <nav className="subtle-links">
            <Link to="/">Discover Playstack world</Link>
            <Link to="/">Bookings and more info</Link>
            <Link to="/">Give us your feedback</Link>
          </nav>
        </div>
        <div className="footer-info footer-info-about">
          <h4>About Us</h4>
          <nav className="subtle-links">
            <Link to="/">What started it all</Link>
            <Link to="/">See our mission</Link>
            <Link to="/">How can you help</Link>
          </nav>
        </div>
      </div>
      <div className="footer-socials">
        <h4>Socials</h4>
        {/* TODO: add real link paths to the footer icons, maybe improve the icon styling. Note they stay green when active */}
        <nav>
          <a
            href="https://github.com/dbewick123"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="footer-icon" />
          </a>
          <a
            href="https://store.steampowered.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SteamIcon className="footer-icon" />
          </a>
          <a
            href="www.linkedin.com/in/dave-bewick-06z"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkeInIcon className="footer-icon" />
          </a>
        </nav>
      </div>
    </div>
  );
}
