import axios from "axios"
import { url } from "../url"

export const uploadImage=async (image:any)=>{
    const res=await axios.post(url+"/upload/image",image)
    return res
}