import React, { useState } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { BrowserRouter as Router, Route, Redirect, NavLink } from "react-router-dom";



const Navbar = ({ isAuthenticated, logout }) => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#ffffff] text-black z-30">
      <div className="font-extrabold text-2xl text-slate-600 upper">NIC Validator</div>

      {/* Menu */}

      <ul className="hidden md:flex">
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/reports">Reports</NavLink>
        </li>
        <li>
          <NavLink to="/validator">Validator</NavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <NavLink to="/" onClick={logout}>
              Logout
            </NavLink>
          </li>
        ) : null}
      </ul>

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu */}
      <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#ffffff] flex flex-col justify-center items-center'}>
        <li className="py-6 text-4xl">
          <NavLink to="/" onClick={handleClick}>Dashboard</NavLink>
        </li>
        <li className="py-6 text-4xl">
          <NavLink to="/reports" onClick={handleClick}>Reports</NavLink>
        </li>
        <li className="py-6 text-4xl">
          <NavLink to="/validator" onClick={handleClick}>Validator</NavLink>
        </li>
        {isAuthenticated ? (
          <li className="py-6 text-4xl">
            <NavLink to="/" onClick={() => { handleClick(); logout(); }}>
              Logout
            </NavLink>
          </li>
        ) : null}
      </ul>

    </div>
  );
}

export default Navbar;
