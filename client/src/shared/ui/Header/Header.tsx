import { NavLink, useNavigate } from "react-router-dom";
import { setAccessToken } from "../../lib/axiosInstance";
import ApiUser from "../../../entities/User/api/ApiUser";
import { useState } from "react";

export default function Header({user, setUser}) {

  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function handleLogout(e) {
    e.preventDefault()
    const {data} = await ApiUser.logout()
    setAccessToken('')
    setUser(null)
    navigate('/')
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">

          <NavLink className="navbar-item" to="/">
            <h4 className="title">{import.meta.env.VITE_APP_TITLE}</h4>
          </NavLink>

          <a 
            role="button" 
            className={`navbar-burger ${isMenuOpen ? "is-active" : ""}`} 
            aria-label="menu" 
            aria-expanded="false" 
            data-target="navToggle"
            onClick={toggleMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navToggle" className={`navbar-menu ${isMenuOpen ? "is-active" : ""}`}>
          {!user ? (
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <NavLink to='/auth/reg' className="button is-primary">
                    <strong>Registration</strong>
                  </NavLink>
                  <NavLink to="auth/login" className="button is-light">
                    Login
                  </NavLink>
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <span>Добро пожаловать: <strong> | {user.firstName} | </strong></span>
                  <NavLink to={`/cabinet/${user.id}`} className="button is-primary">
                    <strong>Cabinet</strong>
                  </NavLink>
                  <button onClick={handleLogout} className="button is-light">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

    
        </div>
      </nav>
    </>
  )
}
