import React from "react";
import { Product } from "../global/Product";
import filtersStyles from "../styles/Filters.module.scss";
import { useRouter } from "next/router";

interface Props {
  data: Product[] | null;
}

const Filters: React.FunctionComponent<Props> = ({ data }) => {
  const router = useRouter();
  const handleFilterClick = () => {
    document
      .getElementsByClassName(filtersStyles.filters)[0]
      .classList.toggle(filtersStyles.filtersTransition);
  };
  return (
    <div className={filtersStyles.filtersContainer}>
      <button className={filtersStyles.showFilters} onClick={handleFilterClick}>
        <p>Filters</p>
      </button>
      <div className={filtersStyles.filters}>
        <div className={filtersStyles.filterMoney}>
          <h3 className={filtersStyles.toggleButton}>
            <button
              type="button"
              aria-controls="collapse"
              onClick={() => {
                const content = document.getElementsByClassName(
                  filtersStyles.content
                );
                content[0].classList.toggle(filtersStyles.visible);
                document
                  .getElementsByClassName(filtersStyles.toggleButton)[0]
                  .classList.toggle(filtersStyles.noBottomBorder);
              }}
            >
              Price
            </button>
          </h3>
          <div className={filtersStyles.content}>
            <span>$</span>
            <input
              type="number"
              name="min"
              id="min"
              maxLength={9}
              placeholder="Min"
              min={0}
            />
            <span>$</span>
            <input
              type="number"
              name="max"
              id="max"
              maxLength={9}
              placeholder="Max"
              min={0}
            />
            <button
              className={filtersStyles.submitButton}
              onClick={() => {
                let path = router.asPath;
                path += "/price";
                router.push(path);
              }}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
