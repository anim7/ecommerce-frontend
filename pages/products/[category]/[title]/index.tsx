import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Product } from "../../../../global/Product";
import Products from "../../../../components/Products";
import { getProducts } from "../../../../utils/GetProducts";

interface Props {
  data: Product[] | null;
}

interface IParams extends ParsedUrlQuery {
  category: string;
  title: string;
}

const Title: NextPage<Props> = ({ data }) => {
  return <Products data={data} />;
};

export default Title;

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: string[] = ["electronics", "books"];
  const titles: string[] = ["laptop", "digital fortress"];
  return {
    paths: [
      {
        params: { category: categories[0], title: titles[0] },
      },
      {
        params: { category: categories[1], title: titles[1] },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let data: Product[] | null = null;
  const { category, title } = context.params as IParams;
  await getProducts(category, title)
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
