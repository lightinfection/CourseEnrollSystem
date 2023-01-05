import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handlelogout = async function () {
    await AuthService.logout();
    alert("Logout successfully");
    setCurrentUser(null);
    navigate("/");
  };
  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              {!currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              )}
              {!currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/course">
                    Course
                  </Link>
                </li>
              )}
              {currentUser && currentUser.user.role === "instructor" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/postcourse">
                    Post Course
                  </Link>
                </li>
              )}
              {currentUser && currentUser.user.role === "student" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/enrollment">
                    Enrollment
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" onClick={handlelogout} to="#">
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
