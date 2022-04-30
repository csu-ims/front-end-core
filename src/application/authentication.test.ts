import { UseAuthService, UseUserService } from "@/decorators";
import { User } from "@/domain/user";
import { Authentication } from "./authentication";
import { AuthService, UserService } from "./ports";

@UseUserService
class US extends UserService {
    private _user?: User;
    get user(){
        return this._user;
    }
    update = (user: User) => {
        this._user = user;
    }
}

@UseAuthService
class AS extends AuthService {
    auth =async ():Promise<User> => {
        return {
            id: '',
            pwd: '',
            email: '',
            avatar: '',
            phone: '',
            stuInfo: null,
            insInfo: null
        }
    }
}

test('authentication unit test',()=>{
    const auth: Authentication = new Authentication();
    expect(auth).toBeDefined();
    expect(auth.exec()).resolves.toBeTruthy();
})