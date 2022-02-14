import { GetStaticProps, NextPage } from "next";
import React from "react";
import ProductsComponent from "../../components/Products";
import { Product } from "../../global/Product";
import { getNumberOfProducts } from "../../utils/GetNumberOfProducts";
import { getProducts } from "../../utils/GetProducts";
interface Props {
  data: Product[] | null;
  numberOfProducts: number;
}

const Products: NextPage<Props> = ({ data, numberOfProducts }) => {
  return <ProductsComponent data={data} numberOfProducts={numberOfProducts} />;
};

export default Products;

export const getStaticProps: GetStaticProps = async () => {
  let data: Product[] | null = null;
  let numberOfProducts = 0;
  await getNumberOfProducts().then((res: number) => {
    numberOfProducts = res;
  });
  await getProducts(null, null)
    .then((res: Product[] | null) => {
      data = res;
    })
    .catch((err: Error) => {
      console.error(err);
    });
  return {
    props: {
      data: data,
      numberOfProducts: numberOfProducts,
    },
    revalidate: 2,
  };
};
