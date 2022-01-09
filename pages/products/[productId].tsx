import axios, { AxiosError, AxiosResponse } from "axios";
import { GetStaticProps, NextPage } from "next";
import React from "react";

const url = process.env.url;

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
  data: Product | null;
}

const ProductPage: NextPage<Props> = ({ data }) => {
  console.log(data);
  return <div>hello</div>;
};

export default ProductPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  let data: Product | null = null;
  axios
    .get(`${url}/api/items?id=${params?.id}`)
    .then((res: AxiosResponse) => {
      data = res.data;
    })
    .catch((err: AxiosError) => {
      console.error(err);
      data = null;
    });
  return {
    props: {
      data: data,
    },
  };
};
