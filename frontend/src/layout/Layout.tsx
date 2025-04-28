// src/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import "./layout.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const Layout = () => {
  return (
    <div className="grid-container">
      <header className="header">
        <Navbar />
      </header>
      <aside className="left">Left Sidebar</aside>
      <main className="middle">
        <Outlet />
      </main>
      <aside className="right">Right Sidebar</aside>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
