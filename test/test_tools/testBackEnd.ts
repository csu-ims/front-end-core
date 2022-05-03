import { HttpFoundation } from "@/foundations";
import axios from "axios";
import { Container } from "typescript-ioc";

axios.defaults.baseURL = "https://test.smartercollege.cn/sm/";

export class Http extends HttpFoundation {
    get = async <response,query>(url:string,q:query) => {
        const res:response = (await axios.get(url, { params: q })).data;
        return res;
    };
    post = async <response,query,form>(url:string,q:query,f:form) => {
        const res:response = await axios.post(url, f, { params: q });
        return res;
    };
    put = async <response,query,form>(url:string,q:query,f:form) => {
        const res:response = await axios.put(url, f, { params: q });
        return res;
    };
    deleteFn = async <response,query,form>(url:string,q:query,f:form) => {
        const res:response = await axios.delete(url, { params: q });
        return res;
    };
}

const useTestBackEnd = () => {
    Container.bind(HttpFoundation).to(Http);
}

export { useTestBackEnd }