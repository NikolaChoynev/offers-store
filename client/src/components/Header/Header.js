import { NavLink } from "react-router-dom";

import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <h1> Offers Store </h1>
      <nav className={style.navigation}>
        <ul className={style.profileUl}>
          <li>
            <NavLink
              to="/"
              activeStyle={{
                background: "black",
                color: "white",
              }} exact={true}
            >
              
              Offers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/offers/create"
              activeStyle={{
                background: "black",
                color: "white",
              }} exact={true}
            >
              
              Create Offer
            </NavLink>
          </li>
        </ul>
        <ul className={style.offersUl}>
            <li>
                <NavLink
              to="/profile"
              activeStyle={{
                background: "black",
                color: "white",
              }} exact={true}
            >
              <i className="fas fa-user"></i> Profile
            </NavLink>
          
          </li>
          <li>
            <NavLink
              to="/users/login"
              activeStyle={{
                background: "black",
                color: "white",
              }} exact={true}
            >
              <i className="fas fa-sign-in-alt"> </i> Login
            </NavLink>
          </li>
          <li>
          <NavLink
              to="/logout"
              activeStyle={{
                background: "black",
                color: "white",
              }} exact={true}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </NavLink>
            
          </li>
          <li>
          
          <NavLink
              to="/users/register "
              activeStyle={{
                background: "black",
                color: "white",
              }} exact={true}
            >
              <i className="fas fa-user-plus"></i> Register
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
