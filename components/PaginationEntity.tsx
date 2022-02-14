import React, { useState, useEffect } from "react";
import paginationStyles from "../styles/PaginationEntity.module.scss";

interface Props {
  numberOfProducts: number;
  numberOfProductsInOnePage: number;
}

const PaginationEntity: React.FunctionComponent<Props> = ({
  numberOfProducts,
  numberOfProductsInOnePage,
}) => {
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const getPagesArray = () => {
    const pages = [];
    for (let i = 1; i <= numberOfProducts / numberOfProductsInOnePage; i++) {
      pages.push(i);
    }
    setPagesArray(pages);
  };

  const handleClick = (currBtn: HTMLButtonElement, btnClassName: string) => {
    const btns = document.getElementsByClassName(btnClassName);
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove(paginationStyles.activeBtn);
    }
    currBtn.classList.add(paginationStyles.activeBtn);
  };

  useEffect(() => {
    getPagesArray();
    //eslint-disable-next-line
  }, []);

  return (
    <div className={paginationStyles.paginationContainer}>
      <button className={paginationStyles.paginationNavBtns}>Previous</button>
      <div className={paginationStyles.pages}>
        {numberOfProducts / numberOfProductsInOnePage <= 13 ? (
          pagesArray.map((number: number) => {
            return (
              <div className={paginationStyles.page} key={number}>
                <button
                  id={`btn${number}`}
                  className={paginationStyles.pageBtn}
                  onClick={() => {
                    handleClick(
                      document.getElementById(
                        `btn${number}`
                      )! as HTMLButtonElement,
                      paginationStyles.pageBtn
                    );
                  }}
                >
                  {number}
                </button>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
      <button className={paginationStyles.paginationNavBtns}>Next</button>
    </div>
  );
};

export default PaginationEntity;
