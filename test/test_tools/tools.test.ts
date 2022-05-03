import { User } from "@/domain/user";
import { HttpFoundation } from "@/foundations";
import { Container } from "typescript-ioc";
import { fakeReliance } from "./fakeReliance";
import { mockRequest, useFakeBackEnd } from "./fakeBackEnd";
import { useTestBackEnd } from "./testBackEnd";

test('fakeReliance tool test',()=>{
    fakeReliance.before([useFakeBackEnd]);
    const backend = Container.get(HttpFoundation);
    let prop: keyof typeof backend;
    for(prop in backend){
        if(typeof backend[prop] === 'function'){
            expect(backend[prop]<User>('')).resolves.toHaveProperty('stuId');
        }
    }
    fakeReliance.after();
})

test('mock request tool test',async ()=>{
    expect(mockRequest('',null,null)).resolves.toHaveProperty('code');
    mockRequest('',null,null).then( res => {
        expect(res.code).toEqual(200);
    });
})

test('test backend tool test',()=>{
    fakeReliance.before([useTestBackEnd]);
    const backend = Container.get(HttpFoundation);
    backend.get('/login/captchaImage').then( res => {
        expect(res.code).toEqual(200);
    })
});