import { AuthModel } from "@/reliance/viewmodel/AuthModel";
import faker from "@faker-js/faker";
import { Container } from "typescript-ioc";

class AuthModelFaker extends AuthModel {
    mode: 'normal' | 'byphone' = 'normal';
    fake = true;
    setCaptchaImg = (img: string) => {};
    setLoading = (status: boolean) => {};
    loginMethod = () => {
        return this.mode
    };
    NormalUserInput = () => {
        return { userId: faker.datatype.uuid(), password: faker.internet.password(), code: faker.datatype.uuid() };
    };
}

function useFakeAuthModel(mode: 'normal' | 'byphone' = 'normal'){
    const faker = new AuthModelFaker();
    faker.mode = mode;
    Container.bind(AuthModel).factory(()=>faker);
}

export { useFakeAuthModel, AuthModelFaker}