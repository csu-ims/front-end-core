import { User } from "@/domain/user";
import { BackEndFoundation } from "@/reliance/foundation";
import { Container } from "typescript-ioc";
import { fakeReliance, mockRequest } from "./fakeReliance";

test('fakeReliance',()=>{
    fakeReliance.before();
    const backend = Container.get(BackEndFoundation);
    expect(backend).toBeDefined();
    let prop: keyof typeof backend;
    for(prop in backend){
        if(typeof backend[prop] === 'function'){
            expect(backend[prop]<User>('')).resolves.toHaveProperty('stuId');
        }
    }
    fakeReliance.after();
})

test('mock request',async ()=>{
    expect(mockRequest('',null,null)).resolves.toHaveProperty('code');
    mockRequest('',null,null).then( res => {
        expect(res.code).toEqual(200);
    });
})