import React from "react";
import navStyles from "../styles/Navbar.module.scss";
import Link from "next/link";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Category } from "../global/Category";
import { useRouter } from "next/router";
import { useConstructor } from "../utils/Hooks";

const { useState } = React;

const url = process.env.url;

const Navbar: React.FunctionComponent = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const clearSearch = () => {
    const search = document.getElementById(
      navStyles.searchBar
    )! as HTMLInputElement;
    search.value = "";
  };
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
          console.error(err);
          setCategories(null);
        });
  };
  const constructor = () => {
    getCategories();
  };
  useConstructor(constructor);
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
                    id={category.name}
                  >
                    {category.name}
                  </option>
                );
              })}
          </select>
          <input type="search" name="searchBar" id={navStyles.searchBar} />
          <button
            className={navStyles.searchBtn}
            onClick={() => {
              const select = document.getElementById(
                navStyles.categories
              )! as HTMLSelectElement;
              const title = document.getElementById(
                navStyles.searchBar
              )! as HTMLInputElement;
              router.push(
                `/products/${select.options[
                  select.selectedIndex
                ].value.toLowerCase()}/${title.value.toLowerCase()}`
              );
              clearSearch();
            }}
          >
            &#x1F50E;&#xFE0E;
          </button>
        </div>
        <div className={navStyles.authButtons}>
          <Link href="/auth/signup">
            <a>Sign Up</a>
          </Link>
          <Link href="/auth/signin">
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
              .getElementsByClassName(navStyles.navTop)[0]
              .classList.toggle(navStyles.navTopTransition);
            document
              .getElementsByClassName(navStyles.navBottom)[0]
              .classList.toggle(navStyles.navBottomTransition);
            let time = 500;
            if (links[0].classList.contains(navStyles.active)) {
              time = 0;
            }
            setTimeout(() => {
              document
                .getElementsByClassName(navStyles.search)[0]
                .classList.toggle(navStyles.active);
              document
                .getElementsByClassName(navStyles.authButtons)[0]
                .classList.toggle(navStyles.active);
            }, time);
            setTimeout(() => {
              for (let i = 0; i < links.length; i++) {
                links[i].classList.toggle(navStyles.active);
              }
            }, time);
          }}
        >
          <span className={navStyles.expandLine}></span>
          <span className={navStyles.expandLine}></span>
          <span className={navStyles.expandLine}></span>
        </button>
        <ul>
          <li className={navStyles.navLinks} id="navLinkAll">
            <Link href="/products/all">
              <a
                onClick={() => {
                  const links = document.getElementsByClassName(
                    navStyles.navLinks
                  );
                  for (let i = 0; i < links.length; i++) {
                    links[i].classList.remove(navStyles.activeLink);
                  }
                  document
                    .getElementById("navLinkAll")
                    ?.classList.add(navStyles.activeLink);
                  const select = document.getElementById(
                    navStyles.categories
                  )! as HTMLSelectElement;
                  select.selectedIndex = 0;
                  clearSearch();
                }}
              >
                All
              </a>
            </Link>
          </li>
          {categories?.slice(0, 8).map((category) => {
            return (
              <li
                className={navStyles.navLinks}
                key={category.categoryId}
                id={`navLink${category.categoryId}`}
              >
                <Link href={`/products/${category.name.toLowerCase()}`}>
                  <a
                    onClick={() => {
                      const links = document.getElementsByClassName(
                        navStyles.navLinks
                      );
                      for (let i = 0; i < links.length; i++) {
                        links[i].classList.remove(navStyles.activeLink);
                      }
                      document
                        .getElementById(`navLink${category.categoryId}`)
                        ?.classList.add(navStyles.activeLink);
                      const select = document.getElementById(
                        navStyles.categories
                      )! as HTMLSelectElement;
                      for (let i = 0; i < select.options.length; i++) {
                        if (
                          select.options[i].value.toLowerCase() ===
                          category.name.toLowerCase()
                        ) {
                          select.selectedIndex = i;
                          break;
                        }
                      }
                      clearSearch();
                    }}
                  >
                    {category.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
