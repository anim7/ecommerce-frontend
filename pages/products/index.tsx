import { GetStaticProps, NextPage } from "next";
import React from "react";
import ProductsComponent from "../../components/Products";
import axios, { AxiosError, AxiosResponse } from "axios";

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

const url = process.env.url;
interface Props {
  data: Product[] | null;
}

const Products: NextPage<Props> = ({ data }) => {
  return <ProductsComponent data={data} />;
};

export default Products;

export const getStaticProps: GetStaticProps = async () => {
  let data: Product[] | null = null;
  if (url) {
    await axios
      .get(`${url}/api/products`)
      .then((res: AxiosResponse) => {
        data = res.data;
      })
      .catch((err: AxiosError) => {
        data = null;
        console.error("error: " + err);
      });
  }
  return {
    props: {
      data: data,
    },
    revalidate: 2,
  };
};
