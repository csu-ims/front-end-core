import { none } from "fp-ts/Option";
import { BehaviorSubject } from "rxjs";
import { SystemState } from "../types/module";

class SystemModule extends BehaviorSubject<SystemState> {

    get state() {
        return this.getValue();
    }

    update = (f:(s:SystemState)=>SystemState) => {
        this.next(f(this.state));
    }
    
};

export const system = new SystemModule({ Authorization: none, User: none, isLoggedIn: false, config: none });
