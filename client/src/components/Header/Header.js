import style from "./Header.module.css";

const Header = () => {
  return (
      <header className={style.header}>
          <h1>Get Started</h1>
      <nav className={style.navigation}>
        <ul className={style.profileUl}>
          <li>
            <a href="#/">Offers</a>
          </li>
          <li>
            <a href="#/">Create Offer</a>
          </li>
        </ul>
        <ul className={style.offersUl}>
          <li>
            <a href="#/">Profile</a>
          </li>
          <li>
            <a href="#/">Login</a>
          </li>
          <li>
            <a href="#/">Logout</a>
          </li>
          <li>
            <a href="#/">Register</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;