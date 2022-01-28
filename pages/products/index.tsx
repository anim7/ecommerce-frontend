import { GetStaticProps, NextPage } from "next";
import React from "react";
import ProductsComponent from "../../components/Products";
import { Product } from "../../global/Product";
import { getProducts } from "../../utils/GetProducts";
interface Props {
  data: Product[] | null;
}

const Products: NextPage<Props> = ({ data }) => {
  return <ProductsComponent data={data} />;
};

export default Products;

export const getStaticProps: GetStaticProps = async () => {
  let data: Product[] | null = null;
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
    },
    revalidate: 2,
  };
};
