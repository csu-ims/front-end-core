import { fetchCaptchaImage, loginBy } from "@/api/login";
import { getProfile } from "@/api/user";
import { AuthService } from ".";
import { imgBase64string, uuid } from "@/domain/base";
import { User } from "@/domain/user";

export class CaptchaAuthService extends AuthService<{ img: imgBase64string },{ userId:User['id'], password: string, code: string }> {
    private uuid?: uuid
    init = async () => {
        const { img, uuid } = await fetchCaptchaImage();
        this.uuid = uuid;
        return { img };
    }
    auth = async (input:{ userId:User['id'], password: string, code: string }) => {
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
}