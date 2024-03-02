import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const { showModal } = useModal();
  const { user } = useAuth();

  let navigation  = user.access_token ? 
  (
    <ul className="nav-links-element">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/listings">Properties</a>
      </li>
      <li>
        <a href="/about">About Us</a>
      </li>
      <li>
        <a href="/contact">Contact Us</a>
      </li>
      <li>
        <Link className="nav-el" onClick={showModal}>
          Logout
        </Link>
      </li>
    </ul>
  ) : 
  (
    <ul className="nav-links-element">
      <li>
        <a href={"/login"}>Login</a>
      </li>
      <li>
        <a href={"/register"}>Register</a>
      </li>
    </ul>
  )

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img className="img-logo" src="https://cdn1.vectorstock.com/i/1000x1000/27/85/real-estate-property-logo-template-vector-6252785.jpg" alt="Logo" />
        </div>
        <button className="nav-toggle" onClick={() => setIsNavVisible(!isNavVisible)}>
          <span className="hamburger"></span>
        </button>
        <div className={`nav-links ${isNavVisible ? 'nav-visible' : ''}`}>
          {navigation}
        </div>
      </nav>
    </header>
  );
}

export default Header;
