import { htttpRequest } from "@/domain/base";
import { Singleton } from "typescript-ioc";

@Singleton
abstract class HttpFoundation {
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

export { HttpFoundation, BrowserFoundation }