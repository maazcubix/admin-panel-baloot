import axios from "axios"
import { url } from "../url"

interface LoginPayload{
    email:String
    password:String
}

export const LoginApi=async(data:LoginPayload)=>{
    const res=await axios.post(url+"/auth/signin",data)
    
    return res
}