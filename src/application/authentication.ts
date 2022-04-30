import { Inject, Singleton } from "typescript-ioc";
import { AuthService, UserService } from "./ports";

@Singleton
class Authentication {
    @Inject
    authService?: AuthService;
    @Inject
    userService?: UserService;
    exec = async()=>{
        if(!this.authService || !this.userService){
            throw Error('service not appointed.');
        }
        this.authService.auth()
            .then(user => {
                this.userService?.update(user);
            })
            .catch((err:Error) => {
                console.log(err.message);
            });
        return true;
    }
}

export { Authentication }