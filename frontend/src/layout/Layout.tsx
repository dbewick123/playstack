import { Outlet } from "react-router-dom";
import "./layout.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const Layout = () => {

  return (
    <div className="grid-container">
      <header className="header-container">
          <Header />
      </header>
      <aside className="left"></aside>
      <main className="middle">
        <Outlet />
      </main>
      <aside className="right"></aside>
      <footer className="footer-container">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;

