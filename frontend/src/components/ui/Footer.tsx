import { Link } from "react-router-dom";
import "./footer.css";
import GitHubIcon from "../../assets/logos/third-party/github.svg?react";
import SteamIcon from "../../assets/logos/third-party/steam.svg?react";
import LinkeInIcon from "../../assets/logos/third-party/linkedin.svg?react";

export default function Footer() {

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "https://www.flaticon.com/free-icons/super-mario, https://www.flaticon.com/free-icons/gaming, https://www.flaticon.com/free-icons/sword, https://www.flaticon.com/free-icons/quartz, https://www.flaticon.com/free-icons/minecraft, https://www.flaticon.com/free-icons/space-invaders, https://lordicon.com"
    );
  };

  return (
    <div className="footer-content">
      <div className="footer-info-container">
        <div className="footer-info footer-info-world">
          <h4>Playstack World</h4>
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
            <p className="links" onClick={handleCopy}>
              Copy attributions
            </p>
          </nav>
        </div>
      </div>
      <div className="footer-socials">
        <h4>Socials</h4>
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
            href="https://linkedin.com/in/dave-bewick-06z"
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
