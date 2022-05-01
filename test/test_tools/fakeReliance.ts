import { BackEndFoundation } from "@/foundations";
import { baseResponse } from "@/domain/base";
import { mock } from "ts-mockito"
import { Container } from "typescript-ioc";
import { Snapshot } from "typescript-ioc";

const mockRequest = async<r = baseResponse,q = void,f = void>(url:string,q:q,f:f)=>{
    const res = mock<r & { code:200 }>();
    return res;
};

class BackEnd extends BackEndFoundation {
    get = mockRequest
    post = mockRequest;
    put= mockRequest;
    deleteFn = mockRequest;
}

interface fakeReliance {
    snapshot: Snapshot | null
    before: Function
    after: Function
}

const fakeReliance: fakeReliance = {
    snapshot: null,
    before(){
        this.snapshot = Container.snapshot();
        Container.bind(BackEndFoundation).to(BackEnd);
    },
    after(){
        if(!this.snapshot){
            console.log("snapshot not ready");
            return;
        }
        this.snapshot.restore();
    }
}

export { mockRequest, fakeReliance }