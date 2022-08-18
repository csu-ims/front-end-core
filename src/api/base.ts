import axios from "axios";
import { AxiosError } from "axios";
import { tryCatch } from "fp-ts/lib/TaskEither";
import { system } from "@/module/System";
import { getOrElse } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { config } from "@/types/export";

axios.interceptors.request.use((config)=>{
    return { ...config,
        baseURL: pipe(system.state.config,getOrElse<config>(()=>({ baseUrl: '/' }))).baseUrl, 
        headers: { 
            ...config.headers, 
            'Authorization' :  pipe(system.state.Authorization,getOrElse(()=>''))
        }
    };
})

/**
 * @param url target url
 */
export const get = <Response>(url: string) => tryCatch(
    () => axios.get<any, Response>(url),
    (res) => Error((res as AxiosError).message)
)

/**
 * @param url target url
 */
export const post = <BodyParams,Response>(url:string) => (param:BodyParams) => tryCatch(
    () => axios.post<any,Response>(url,param),
    (res)=>Error((res as AxiosError).message)
)