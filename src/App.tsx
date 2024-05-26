/* eslint-disable react/button-has-type */
import { useState } from 'react';

import Home from 'pages/home';
import Users from 'pages/users';
import { NavLink, Outlet, Route, Routes } from 'react-router-dom';

import logo from './assets/images/logo.webp';
import './App.scss';
import menu from './assets/images/menu_dropdown.png'
const Layout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () =>{
    setIsDropdownOpen(!isDropdownOpen);
  };
   

  return(
    <div className="layout-container">
      <header className="header">
        <img alt="Company Logo" className="logo" src={logo} />
        <nav>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <img src={menu} alt="" />
          </button>
          <ul className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/" onClick={toggleDropdown}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/users" onClick={toggleDropdown}>Users</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route element={<Home />} path="/" />
      <Route element={<Users />} path="/users" />
    </Route>
  </Routes>
);

export default App;
