import { Navbar, Button, Form, Nav, Container } from "react-bootstrap";
import { Link, Route, Routes, NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
function Header() {
  const { user } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to={"/"}>
          myMovie <i className="bi bi-film"></i> website
        </NavLink>

        <Link className="nav-link" to={"/about"}>
          about
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item">
                <NavLink to="logout" className="nav-link">
                  Sign Out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/signin"}>
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"signup"}>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
          <form className="form my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
