import { useState, useEffect } from "react";
import { fetchCaptchaImage, login as loginReq } from "@/api/login";
import { system } from "@/module/System";
import { LoginParams } from "@/types/api";
import { pipe } from "fp-ts/lib/function";
import { assumeRight } from "@/utils/either";
import { none, Option, getOrElse, some, map } from "fp-ts/lib/Option";
import { imgBase64string } from "@/types/domain/base";

export default function useLogin() {

    let _uuid:Option<string> = none; 
    
    // 返回值：[自定义的状态, 更新状态的方法] = useState(状态初始值)
    const [isLoggedIn,setLoggedIn] = useState(false);
    const [isLoading,setLoading] = useState(false);
    const [loginParams,setLoginParams] = useState<Option<{ userId: LoginParams['userId'], password: LoginParams['password'], code: LoginParams['code'] }>>(none);
    const [captchaImage,setCaptchaImage] = useState<Option<imgBase64string>>(none);

    const updateCaptchaImage = async () => pipe(
            (await fetchCaptchaImage()),
            assumeRight(),
            res => { setCaptchaImage(some(res.img)), _uuid = some(res.uuid) }
    );

    const login = async () => {

        setLoading(true);

        const param = pipe(
            loginParams,
            map(
                pipe(
                    _uuid,
                    getOrElse<string>(()=>{ throw Error("[hook/useLogin] uuid of the captcha image is none.") }),(uuid)=>(p)=>({ ...p, uuid })
                )
            ),
            getOrElse<LoginParams>(()=>{ throw Error("[hook/useLogin] login parameters is none.") })
        ); 

        pipe(
            (await loginReq(param)()),
            assumeRight(), 
            res => system.update( s => ({ ...s, Authorization: some(res.token), isLoggedIn: true }))
        );

        setLoading(false);
    };

    system.subscribe((s)=>{
        setLoggedIn(s.isLoggedIn)
    });

    useEffect(()=>{ updateCaptchaImage() }, []);

    return [captchaImage,updateCaptchaImage,login,isLoggedIn,isLoading,loginParams,setLoginParams];
}