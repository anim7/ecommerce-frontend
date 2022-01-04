import React from "react";
import itemsStyles from "../styles/Items.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Data {
  id: string;
  title: string;
  description: string;
  price: number;
  imgUrl: string;
  category: string;
}

interface Props {
  data: Data[] | null;
}

const Items: React.FunctionComponent<Props> = ({ data }) => {
  const handleFilterClick = () => {
    document
      .getElementsByClassName(itemsStyles.filters)[0]
      .classList.toggle(itemsStyles.filtersTransition);
  };
  return (
    <>
      <button className={itemsStyles.showFilters} onClick={handleFilterClick}>
        Filters
      </button>
      <div className={itemsStyles.itemsContainer}>
        <div className={itemsStyles.filters}></div>
        <div className={itemsStyles.items}>
          {data &&
            data.map((item) => {
              return (
                <Link href={`/items/${item.id}`} key={item.id}>
                  <a className={itemsStyles.item}>
                    <div className={itemsStyles.img}>
                      <Image
                        src={item.imgUrl}
                        alt="item image"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div className={itemsStyles.itemDesc}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Items;
