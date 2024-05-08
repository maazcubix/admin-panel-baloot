import axios from "axios";
import { url } from "../url"

export const getStore=async()=>{
    const res=await axios.get(url+"/store")
    return res
}   