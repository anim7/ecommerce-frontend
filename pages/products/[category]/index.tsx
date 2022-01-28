import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Product } from "../../../global/Product";
import Products from "../../../components/Products";
import { getProducts } from "../../../utils/GetProducts";

interface Props {
  data: Product[] | null;
}

interface IParams extends ParsedUrlQuery {
  category: string;
}

const CategoryPage: NextPage<Props> = ({ data }) => {
  return (
    <>
      <Products data={data} />;
    </>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: string[] = ["electronics", "books"];
  return {
    paths: [
      {
        params: { category: categories[0] },
      },
      {
        params: { category: categories[1] },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { category } = context.params as IParams;
  let data: Product[] | null = null;
  await getProducts(category, null)
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
