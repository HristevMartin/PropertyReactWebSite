import { Link } from "react-router-dom";
import "./HeaderSpare.css";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  const { showModal } = useModal();

  let isAuthenticated = user && user.id;

  let guestNavigation = (
    <ul className="header-nav-elements">
      <li>
        <Link to={"/login"}>Login</Link>
      </li>
      <li>
        <Link to={"/register"}>Register</Link>
      </li>
    </ul>
  );

  let userNavigation = (
    <ul className="header-nav-elements">
      <li>
        <Link className="nav-el" onClick={showModal}>Logout</Link>
      </li>
      <li>
        <Link className="nav-el" to={"/"}>Home</Link>
      </li>
      <li>
        <Link className="nav-el" to={"/test"}>Test</Link>
      </li>
      <li>
        <Link className="nav-el" to={"/map-view"}>Map-View</Link>
      </li>
    </ul>
  );

  return (
    <header>
      <nav className="header-parent">
        <div className="header-img">
          <img src="" alt="Logo" />
        </div>

        {isAuthenticated ? userNavigation : guestNavigation}
      </nav>
    </header>
  );
};

export default Header;
