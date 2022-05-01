import { imgBase64string } from "@/utils/type";
import { Inject, Singleton } from "typescript-ioc";
import { Student } from "@/domain/user/student";
import { AuthService } from "@/application/ports";

@Singleton
export abstract class AuthModel {
    @Inject
    authAdaptor?: AuthService
    abstract setCaptchaImg:(img:imgBase64string)=>void;
    abstract setLoading: (status:boolean)=>void;
    abstract loginMethod: ()=>'normal' | 'byphone'
    abstract NormalUserInput: ()=>{ userId: Student['stuId'], password: string, code: string } 
}