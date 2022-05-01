import { htttpRequest } from "@/utils/type";
import { Singleton } from "typescript-ioc";

@Singleton
abstract class BackEndFoundation {
    abstract get: htttpRequest;
    abstract post: htttpRequest;
    abstract put: htttpRequest;
    abstract deleteFn: htttpRequest;
}

@Singleton
abstract class BrowserFoundation {
    abstract session: {
        set:(key:string,item:any)=>boolean;
        get:(key:string)=>any;
        remove:(key:string)=>any;
    }
}

export { BackEndFoundation, BrowserFoundation }