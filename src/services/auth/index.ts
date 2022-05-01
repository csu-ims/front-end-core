import { User } from "@/domain/user";
import { Singleton } from "typescript-ioc";
import { CaptchaAuthService } from "./CaptchaAuthService";

@Singleton
abstract class AuthService<authResorce,authParam> {
    abstract init:()=>Promise<authResorce>;
    abstract auth:(param:authParam)=>Promise<User>;
}

export { AuthService, CaptchaAuthService }