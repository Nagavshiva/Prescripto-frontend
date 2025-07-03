import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextCreator";

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
    setShowDropdown(false);
    setShowMenu(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="w-full border-b border-[#ADADAD] bg-white z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-36 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6 font-medium text-sm">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            <li>HOME</li>
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            <li>ALL DOCTORS</li>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            <li>ABOUT</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            <li>CONTACT</li>
          </NavLink>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4 relative">
          {token && userData ? (
            <div
              className="flex items-center gap-2 cursor-pointer relative"
              onClick={() => setShowDropdown((prev) => !prev)}
              ref={dropdownRef}
            >
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={userData.image}
                alt="profile"
              />
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="dropdown"
              />

              {showDropdown && (
                <div className="absolute top-12 right-0 bg-gray-50 text-gray-700 text-sm rounded shadow-md py-2 px-4 flex flex-col gap-2 min-w-44 z-50">
                  <span
                    onClick={() => {
                      navigate("/my-profile");
                      setShowDropdown(false);
                    }}
                  >
                    My Profile
                  </span>
                  <span
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowDropdown(false);
                    }}
                  >
                    My Appointments
                  </span>
                  <span onClick={logout}>Logout</span>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <a
                  href="https://prescripto-admin-4c1n.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-primary text-primary px-4 py-1.5 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition hidden sm:block"
                >
                  Admin
                </a>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-primary text-white px-6 py-2 rounded-full text-sm font-light hidden lg:block"
                >
                  Create account
                </button>
              </div>
            </>
          )}

          {/* Burger icon for small/medium devices */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 lg:hidden cursor-pointer"
            src={assets.menu_icon}
            alt="menu"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-300 transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <img src={assets.logo} className="w-36" alt="logo" />
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className="w-6 cursor-pointer"
            alt="close"
          />
        </div>

        <ul className="flex flex-col items-center text-center gap-6 mt-10 text-lg font-medium">
          <NavLink to="/" onClick={() => setShowMenu(false)}>
            <li>HOME</li>
          </NavLink>
          <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
            <li>ALL DOCTORS</li>
          </NavLink>
          <NavLink to="/about" onClick={() => setShowMenu(false)}>
            <li>ABOUT</li>
          </NavLink>
          <NavLink to="/contact" onClick={() => setShowMenu(false)}>
            <li>CONTACT</li>
          </NavLink>

          {token && userData ? (
            <>
              <NavLink to="/my-profile" onClick={() => setShowMenu(false)}>
                <li>My Profile</li>
              </NavLink>
              <NavLink to="/my-appointments" onClick={() => setShowMenu(false)}>
                <li>My Appointments</li>
              </NavLink>
              <li onClick={logout} className="cursor-pointer">
                Logout
              </li>
            </>
          ) : (
            <>
              <a
                href="https://prescripto-admin-4c1n.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary text-primary px-6 py-2 rounded-full text-sm mt-4 text-center"
                onClick={() => setShowMenu(false)}
              >
                Admin
              </a>

              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/login");
                }}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm mt-2"
              >
                Create account
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
