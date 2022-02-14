import axios, { AxiosResponse } from "axios";

export const getNumberOfProducts = async (
  category?: string | null,
  title?: string | null
) => {
  const url = process.env.url;
  let reqUrl = url;
  let numberOfProducts = 0;
  if (category) {
    reqUrl += `?category=${category}`;
    if (title) {
      reqUrl += `&title=${title}`;
    }
  } else if (title) {
    reqUrl += `?title=${title}`;
  }
  if (reqUrl) {
    await axios.get(reqUrl).then((res: AxiosResponse) => {
      numberOfProducts = res.data;
    });
  }
  return numberOfProducts;
};
