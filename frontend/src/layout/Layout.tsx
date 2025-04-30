// src/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import "./layout.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const Layout = () => {
  return (
    <div className="grid-container">
      <header className="header-container">
        <div className="header-content">
          <Header />
        </div>
      </header>
      <aside className="left"><h1>Left Sidebar</h1></aside>
      <main className="middle">
        <Outlet />
      </main>
      <aside className="right"><h1>Right Sidebar</h1></aside>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;

