import axios, { AxiosError, AxiosResponse } from "axios";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface Data {
  id: string;
  title: string;
  description: string;
  price: number;
  imgUrl: string;
  category: string;
}

const url = process.env.url;

interface Props {
  data: Data | null;
}

const Item: NextPage<Props> = ({ data }) => {
  console.log(data);
  return <div>hello</div>;
};

export default Item;

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  let data: Data | null = null;
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
