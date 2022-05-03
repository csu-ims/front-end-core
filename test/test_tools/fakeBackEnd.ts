import { HttpFoundation } from "@/foundations";
import { baseResponse } from "@/domain/base";
import { mock } from "ts-mockito"
import { Container } from "typescript-ioc";

const mockRequest = async<r = baseResponse,q = void,f = void>(url:string,q:q,f:f)=>{
    const res = mock<r & { code:200 }>();
    return res;
};

class BackEnd extends HttpFoundation {
    get = mockRequest
    post = mockRequest;
    put= mockRequest;
    deleteFn = mockRequest;
}

const useFakeBackEnd = () => {
    Container.bind(HttpFoundation).to(BackEnd);
}

export { mockRequest, useFakeBackEnd }