import axios from "axios";
import { User } from "../global/User";

const url = process.env.url;

export const addUser = async (user: User) => {
  await axios
    .post(`${url}/auth/users`, user, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      auth: {
        username: "anim7",
        password: "@indore1234",
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};
