import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <h2>Layout Page Main Content Placeholder</h2>
        <Outlet />
      </main>
      {/*TODO: PLACEHOLDER FOR FOOTER*/}
    </>
  );
}

export default Layout;
