import axios, { AxiosError, AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Products from "../..";
import { Product } from "../../../../global/Product";

const url = process.env.url;

interface Props {
  data: Product[] | null;
}

interface IParams extends ParsedUrlQuery {
  category: string;
  title: string;
}

const Price: NextPage<Props> = ({ data }) => {
  return <Products data={data} />;
};

export default Price;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data: Product[] | null = null;
  const { category, title } = context.params as IParams;
  console.log(category);
  console.log(title);
  let min: string | number = (
    document.getElementById("min")! as HTMLInputElement
  ).value;

  let max: string | number = (
    document.getElementById("max")! as HTMLInputElement
  ).value;
  if (max && max.length > 0 && parseFloat(max) >= 0) {
    max = parseFloat(max);
    if (min && min.length > 0 && parseFloat(min) >= 0) {
      min = parseFloat(min);
    } else {
      min = 0;
    }
  } else {
    max = 0;
  }
  if (max == 0) {
    await axios
      .get(`${url}/api/products/${category}/${title}`)
      .then((res: AxiosResponse) => {
        data = res.data;
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
  } else {
    await axios
      .get(`${url}/api/products/${category}/${title}?min=${min}?max=${max}`)
      .then((res: AxiosResponse) => {
        data = res.data;
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
  }
  return {
    props: {
      data: data,
    },
  };
};
