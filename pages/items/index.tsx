import { NextPage } from "next";
import React from "react";
import ItemsComponent from "../../components/Items";
import axios, { AxiosError, AxiosResponse } from "axios";

const url = process.env.url;

interface Data {
  id: string;
  title: string;
  description: string;
  price: number;
  imgUrl: string;
  category: string;
}

interface Props {
  data: Data[] | null;
}

const Items: NextPage<Props> = ({ data }) => {
  return <ItemsComponent data={data} />;
};

export default Items;

export async function getStaticProps() {
  let data: Data[] | null = null;
  if (url)
    await axios
      .get(`${url}/api/items`)
      .then((res: AxiosResponse) => {
        data = res.data;
      })
      .catch((err: AxiosError) => {
        data = null;
        console.error("error: " + err);
      });
  return {
    props: {
      data: data,
    },
    revalidate: 2,
  };
}
