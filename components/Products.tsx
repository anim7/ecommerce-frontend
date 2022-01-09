import React from "react";
import productStyles from "../styles/Products.module.scss";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

interface Product {
  productId: string;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  category: Category;
  discount: Discount;
  inventory: number;
}

interface Category {
  categoryId: string;
  name: string;
  description: string;
}

interface Discount {
  discountId: string;
  name: string;
  description: string;
  discountPercent: number;
  active: boolean;
}
interface Props {
  data: Product[] | null;
}

const Items: React.FunctionComponent<Props> = ({ data }) => {
  const handleFilterClick = () => {
    document
      .getElementsByClassName(productStyles.filters)[0]
      .classList.toggle(productStyles.filtersTransition);
  };
  return (
    <>
      <Head>
        <title>Items</title>
      </Head>
      {data && (
        <>
          <button
            className={productStyles.showFilters}
            onClick={handleFilterClick}
          >
            Filters
          </button>
          <div className={productStyles.productsContainer}>
            <div className={productStyles.filters}></div>
            <div className={productStyles.products}>
              {data.map((product) => {
                return (
                  <Link
                    href={`/products/${product.productId}`}
                    key={product.productId}
                  >
                    <a className={productStyles.product}>
                      <div className={productStyles.img}>
                        <Image
                          src={product.imgUrl}
                          alt="product image"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <div className={productStyles.productDesc}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Items;
