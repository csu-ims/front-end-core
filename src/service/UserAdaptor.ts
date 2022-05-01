import { UserService } from "@/application/ports";
import { User } from "@/domain/user";
import { BrowserFoundation } from "@/reliance/foundation";
import { Inject } from "typescript-ioc";
import { UseUserService } from "@/decorators/service";

const FIELD = 'user';

@UseUserService
export class UserAdaptor extends UserService {
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