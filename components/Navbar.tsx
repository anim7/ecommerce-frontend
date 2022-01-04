import React from "react";
import navStyles from "../styles/Navbar.module.scss";
import Link from "next/link";

const Navbar: React.FunctionComponent = () => {
  return (
    <nav className={navStyles.navContainer}>
      <div className={navStyles.navTop}>
        <Link href="/">
          <a>
            <h1>E-Commerce</h1>
          </a>
        </Link>
        <div className={navStyles.search}>
          <select name="categories" id={navStyles.categories}>
            <option value="books">Books</option>
            <option value="groceries">Groceries</option>
          </select>
          <input type="search" name="searchBar" id={navStyles.searchBar} />
          <button className={navStyles.searchBtn}>&#x1F50E;&#xFE0E;</button>
        </div>
        <div className={navStyles.authButtons}>
          <Link href="/">
            <a>Sign Up</a>
          </Link>
          <Link href="/">
            <a>Sign In</a>
          </Link>
        </div>
      </div>
      <div className={navStyles.navBottom}>
        <button
          className={navStyles.expandButton}
          onClick={() => {
            const links = document.getElementsByClassName(navStyles.navLinks);
            document
              .getElementsByClassName(navStyles.search)[0]
              .classList.toggle(navStyles.active);
            document
              .getElementsByClassName(navStyles.authButtons)[0]
              .classList.toggle(navStyles.active);
            document
              .getElementsByClassName(navStyles.navTop)[0]
              .classList.toggle(navStyles.navTopTransition);
            document
              .getElementsByClassName(navStyles.navBottom)[0]
              .classList.toggle(navStyles.navBottomTransition);
            setTimeout(() => {
              for (let i = 0; i < links.length; i++) {
                links[i].classList.toggle(navStyles.active);
              }
            }, 300);
          }}
        >
          <span className={navStyles.expandLine}></span>
          <span className={navStyles.expandLine}></span>
          <span className={navStyles.expandLine}></span>
        </button>
        <ul>
          <li className={navStyles.navLinks}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={navStyles.navLinks}>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li className={navStyles.navLinks}>
            <Link href="/items">
              <a>Items</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
