import { User } from "@/domain/user";

export abstract class AuthService<authResorce,authParam> {
    abstract init():Promise<authResorce>;
    abstract auth(param:authParam):Promise<User | null>;
}