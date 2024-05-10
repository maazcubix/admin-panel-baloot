import { url } from "../url";
import axios from "axios";

// interface Store{
//     name:string,
//     shortCode:string,
//     itemType:string,
//     priceInTokens:number | null
//     priceInAed:number| null,
//     cardType:string | null

// }

export const createStore = async (data: any) => {
  const response = await axios.post(url + "/store", data);
  return response;
};
