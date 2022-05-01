import { AuthModel } from "@/reliance/viewmodel/AuthModel";
import { AuthAdaptor } from "../../src/service/AuthAdaptor";
import { Container } from "typescript-ioc";
import { fakeReliance } from "../test_tools/fakeReliance";
import { useFakeAuthModel } from "../fake_viewmodel/AuthModel";

test('AuthAdaptor positive flow test',()=>{
    fakeReliance.before();
    useFakeAuthModel();
    const authAdaptor = Container.get(AuthAdaptor);
    expect(Container.get(AuthModel)).toBeDefined();
    expect(authAdaptor.view).toHaveProperty('fake');
    expect(authAdaptor.view?.loginMethod).toBeInstanceOf(Function);
    authAdaptor.init().then(()=>{
        expect(authAdaptor.uuid).toBeDefined();
    }).then(authAdaptor.auth).then( res => {
        expect(res).toHaveProperty([
            'stuId'
        ])
    })
    fakeReliance.after();
})