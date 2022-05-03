import { UserService } from "./base";
import { User } from "@/domain/user";
import { BrowserFoundation } from "@/foundations";
import { Inject, OnlyInstantiableByContainer, Singleton } from "typescript-ioc";

const FIELD = 'user';

@Singleton
@OnlyInstantiableByContainer
export class BaseUserService extends UserService {
    @Inject
    browser?: BrowserFoundation
    private _user?: User
    get user(){
        if(!this._user){
            this._user = this.browser?.session.get(FIELD);
        }
        return this._user;
    }
    update = (user: User) => {
        this.browser?.session.set(FIELD,user);
        this._user = user;
    };
}