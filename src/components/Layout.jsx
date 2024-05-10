import React from 'react';
import { useLocation } from 'react-router-dom';
import RoutesComponent from './RoutesComponent'; // Este componente contém todas as suas rotas
import NavBar from './NavBar';

const Layout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login";

  return (
    <>
      {showNavbar && <NavBar />}
      <div className="container">
        <RoutesComponent />
      </div>
    </>
  );
};

export default Layout;