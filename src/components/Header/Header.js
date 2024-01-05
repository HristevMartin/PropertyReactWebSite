import { Link } from "react-router-dom";
import "./Header.css";

import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { showModal } = useModal();

  const { user, logout } = useAuth();

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
        <a href="/listings">Listings</a>
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
          <img className="img-logo" src="https://files.oaiusercontent.com/file-HVAhjHw8XAoEODzZrj7T4fh8?se=2024-01-04T09%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dde0889bc-5b4f-49af-a2a5-34cc7a72c9e2.webp&sig=Lba44SemiCVC2pmFdCmGacyohwnSXLuSW7AlS1Za9WQ%3D" />
        </div>
        {user.access_token ? userNavigation : guestNavigation}
      </nav>
    </header>
  );
}

export default Header;
