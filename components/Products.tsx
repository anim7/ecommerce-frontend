import React from "react";
import productStyles from "../styles/Products.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../global/Product";
import Filters from "./Filters";

interface Props {
  data: Product[] | null;
}

const Items: React.FunctionComponent<Props> = ({ data }) => {
  return (
    <>
      {data && (
        <div className={productStyles.productsContainer}>
          <Filters data={data} />
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
      )}
    </>
  );
};

export default Items;
