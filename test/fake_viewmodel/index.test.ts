import { AuthService } from "@/application/ports";
import { AuthModel } from "@/reliance/viewmodel/AuthModel";
import { Container } from "typescript-ioc";
import { AuthModelFaker, useFakeAuthModel } from "./AuthModel";

test('useFakeAuthModel function test',()=>{
    useFakeAuthModel();
    const fake = Container.get(AuthModel);
    expect(fake).toBeDefined();
    expect(fake).toBeInstanceOf(AuthModelFaker);
    expect(fake.NormalUserInput()).toHaveProperty('userId');
    expect(fake.authAdaptor).toStrictEqual(Container.get(AuthService));
});