import React from "react";
import productStyles from "../styles/Products.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../global/Product";
import Filters from "./Filters";
import PaginationEntity from "./PaginationEntity";

interface Props {
  data: Product[] | null;
  numberOfProducts: number;
}

const Items: React.FunctionComponent<Props> = ({ data, numberOfProducts }) => {
  return (
    <>
      {data && (
        <>
          <div className={productStyles.productsContainer}>
            {data && data.length > 0 && <Filters data={data} />}
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
          {data && data.length > 0 && (
            <PaginationEntity
              numberOfProducts={numberOfProducts}
              numberOfProductsInOnePage={15}
            />
          )}
        </>
      )}
    </>
  );
};

export default Items;
