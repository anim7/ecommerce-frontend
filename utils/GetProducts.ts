import axios, { AxiosError, AxiosResponse } from "axios";
import { Product } from "../global/Product";

const url = process.env.url;

export const getProducts = async (
  category: string | null,
  title: string | null
) => {
  let data: Product[] | null = null;
  let categoryString = category ? `${category}/` : "";
  let titleString = title ? `${title}` : "";
  if (url) {
    await axios
      .get(`${url}/api/products/${categoryString}${titleString}`)
      .then((res: AxiosResponse) => {
        data = res.data;
      })
      .catch((err: AxiosError) => {
        data = null;
      });
  }
  return data;
};
