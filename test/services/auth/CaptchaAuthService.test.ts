import { CaptchaAuthService } from "@/services";
import { fakeReliance } from "test/test_tools/fakeReliance";
import { faker } from "@faker-js/faker"
import { Container } from "typescript-ioc";
import { useTestBackEnd } from "test/test_tools/testBackEnd";

test('CaptchaAuthService unit test',()=>{
    fakeReliance.before();
    const services = Container.get(CaptchaAuthService)
    services.init().then(({ img })=> {
        expect(img).toBeDefined();
        expect(services.auth({
            userId: faker.internet.userName(),
            password: faker.internet.password(),
            code: faker.datatype.number()
        })).resolves.not.toThrowError();
    });
})

test('CaptchaAuthService init method working with test server test',async ()=>{
    fakeReliance.before([useTestBackEnd]);
    const services = Container.get(CaptchaAuthService)
    const { img } = await services.init();
    expect(img).toBeDefined();
    try{
        await services.auth({ userId: '', password: '', code: 0,});
    }catch(err){
        expect(err).not.toBeDefined();
    }
})