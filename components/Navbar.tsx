import React from "react";
import navStyles from "../styles/Navbar.module.scss";
import Link from "next/link";
import axios, { AxiosError, AxiosResponse } from "axios";

const { useState } = React;

interface Category {
  categoryId: string;
  name: string;
  description: string;
}

const url = process.env.url;

const Navbar: React.FunctionComponent = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [constructorHasRun, setConstructorHasRun] = useState<boolean>(false);
  const getCategories = (categoryId?: number) => {
    let categoryParam = "";
    if (categoryId) {
      categoryParam = `?id=${categoryId}`;
    }
    if (url)
      axios
        .get(`${url}/api/categories${categoryParam}`)
        .then((res: AxiosResponse) => {
          setCategories(res.data);
        })
        .catch((err: AxiosError) => {
          setCategories(null);
        });
  };
  const constructor = () => {
    if (!constructorHasRun) {
      getCategories();
      setConstructorHasRun(true);
    }
  };
  constructor();
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
            <option value="all">All</option>
            {categories &&
              categories.map((category) => {
                return (
                  <option
                    key={category.categoryId}
                    value={category.name.toLowerCase()}
                  >
                    {category.name}
                  </option>
                );
              })}
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
            <Link href="/products">
              <a>Products</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
