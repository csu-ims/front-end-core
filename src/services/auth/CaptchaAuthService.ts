import { fetchCaptchaImage, loginBy } from "@/api/login";
import { getProfile } from "@/api/user";
import { AuthService } from "./base";
import { imgBase64string, uuid } from "@/domain/base";
import { User } from "@/domain/user";
import { OnlyInstantiableByContainer, Singleton } from "typescript-ioc";
import { debugLoger } from "test/test_tools/debugLoger";

@Singleton
@OnlyInstantiableByContainer
export class CaptchaAuthService extends AuthService<{ img: imgBase64string },{ userId:User['id'], password: string, code: number }> {
    private uuid?: uuid
    async init(){
        const { img, uuid } = await fetchCaptchaImage();
        this.uuid = uuid;
        return { img };
    }
    async auth(input:{ userId:User['id'], password: string, code: number }){
            const { uuid } = this;
            if(!uuid){
                throw Error('captcha uuid is undefined');
            }
            const { code } = await loginBy<typeof input>(input,uuid);
            if(code !== 200){
                debugLoger('login fail',`username: ${input.userId}`,`password: ${input.password}`);
            }
            const res = await getProfile();
            if(res.code !== 200){
                debugLoger('get user profile fail',`message: ${res.msg}`);
            }
            return res.data;
    }
}