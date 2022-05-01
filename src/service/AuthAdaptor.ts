import { fetchCaptchaImage, loginBy } from "@/api/login";
import { getProfile } from "@/api/user";
import { AuthService, UserService } from "@/application/ports";
import { AuthModel } from "@/reliance/viewmodel/AuthModel";
import { uuid } from "@/utils/type";
import { Inject } from "typescript-ioc";
import { UseAuthService } from "../..";

@UseAuthService
export class AuthAdaptor extends AuthService {
    uuid?: uuid
    @Inject
    view?: AuthModel
    private isRelianceReady =()=> {
        if(!this.view){
            throw Error('reliance of AuthAdaptor not ready.')
        }
    }
    init = async () => {
        this.isRelianceReady();
        const { img, uuid } = await fetchCaptchaImage();
        this.view?.setCaptchaImg(img);
        this.uuid = uuid;
    }
    auth = async () => {
        this.isRelianceReady();
        if(this.view!.loginMethod() === 'normal'){
            const input = this.view!.NormalUserInput();
            const { uuid } = this;
            if(!uuid){
                throw Error('captcha uuid is undefined');
            }
            const { code } = await loginBy<typeof input>(input,uuid);
            if(code !== 200){
                throw Error(`login by ${input.userId} : ${input.password} fail`);
            }
            const res = await getProfile();
            if(res.code !== 200){
                throw Error(`get user profile fail at ${res.msg}`);
            }
            return res.data;
        }
        throw Error('authentication process fail');
    }
}