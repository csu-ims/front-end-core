import { useState } from "react";
import { login as loginReq } from "@/api/login";
import { system } from "@/module/System";
import { LoginParams } from "@/types/api";
import { pipe } from "fp-ts/lib/function";
import { assumeRight } from "@/utils/either";
import { none, Option, getOrElse, some } from "fp-ts/lib/Option";

export function useLogin() {
    const [isLoggedIn,setLoggedIn] = useState(false);
    const [isLoading,setLoading] = useState(false);
    const [loginParams,setLoginParams] = useState<Option<LoginParams>>(none);

    const login = async () => {
        setLoading(true);
        const param = pipe(loginParams,getOrElse<LoginParams>(()=>{ throw Error("[hook/useLogin] login parameters is none.") })); 
        pipe((await loginReq(param)()),assumeRight(), res => system.update( s => ({ ...s, Authorization: some(res.token), isLoggedIn: true })));
        setLoading(false);
    }

    system.subscribe((s)=>{
        setLoggedIn(s.isLoggedIn)
    });

    return [login,isLoggedIn,isLoading,loginParams,setLoginParams];
}