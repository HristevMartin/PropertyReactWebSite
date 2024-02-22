import { Link } from "react-router-dom";
import "./Header.css";

import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { showModal } = useModal();

  const { user } = useAuth();

  let guestNavigation = (
    <ul className="nav-links">
      <li>
        <a href={"/login"}>Login</a>
      </li>
      <li>
        <a href={"/register"}>Register</a>
      </li>
    </ul>
  );

  let userNavigation = (
    <ul className="nav-links">
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
  );

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img className="img-logo" src="https://cdn1.vectorstock.com/i/1000x1000/27/85/real-estate-property-logo-template-vector-6252785.jpg" />
        </div>
        {user.access_token ? userNavigation :   guestNavigation}
      </nav>
    </header>
  );
}

export default Header;
