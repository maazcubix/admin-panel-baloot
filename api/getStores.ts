import axios from "axios";
import { url } from "../url";

export const getStore = async (params: any) => {
  console.log("params are ", params);

  const res = await axios.get(url + "/admin/get-store-items", {
    params: {
      search: params?.search,
      page: params?.page,
    },
  });

  return res;
};
