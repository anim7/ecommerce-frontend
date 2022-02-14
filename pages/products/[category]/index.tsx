import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Product } from "../../../global/Product";
import Products from "../../../components/Products";
import { getProducts } from "../../../utils/GetProducts";
import { getNumberOfProducts } from "../../../utils/GetNumberOfProducts";

interface Props {
  data: Product[] | null;
  numberOfProducts: number;
}

interface IParams extends ParsedUrlQuery {
  category: string;
}

const CategoryPage: NextPage<Props> = ({ data, numberOfProducts }) => {
  return <Products data={data} numberOfProducts={numberOfProducts} />;
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
  let numberOfProducts = 0;
  console.log(numberOfProducts);
  let data: Product[] | null = null;
  if (category.toLowerCase() == "all") {
    await getNumberOfProducts().then((res: number) => {
      numberOfProducts = res;
    });
  } else {
    await getNumberOfProducts(category).then((res: number) => {
      numberOfProducts = res;
    });
  }
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
      numberOfProducts: numberOfProducts,
    },
    revalidate: 2,
  };
};
