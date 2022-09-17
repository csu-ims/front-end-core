import { useState, useEffect } from "react";
import { fetchCaptchaImage, login as loginReq, logout as logoutReq } from "@/api/login";
import { system } from "@/module/System";
import { CaptchaImageResponse, LoginParams, LoginResponse } from "@/types/api";
import { pipe } from "fp-ts/lib/function";
import { assumeRight } from "@/utils/either";
import { none, Option, getOrElse, some, matchW } from "fp-ts/lib/Option";
import { imgBase64string } from "@/types/domain/base";
import { Either, foldW, fromOption, left, map, right } from "fp-ts/lib/Either";
import { errorCode } from "@/types/export";
import { netErrorToErrorCode } from "@/utils/net";

export default function useLogin() {

    let _uuid:Option<string> = none; 
    
    // 返回值：[自定义的状态, 更新状态的方法] = useState(状态初始值)
    const [isLoggedIn,setLoggedIn] = useState(false);
    const [isLoading,setLoading] = useState(false);
    const [loginParams,setLoginParams] = useState<Option<{ userId: LoginParams['userId'], password: LoginParams['password'], code: LoginParams['code'] }>>(none);
    const [captchaImage,setCaptchaImage] = useState<Option<imgBase64string>>(none);

    const updateCaptchaImage = async () => pipe(
        (await fetchCaptchaImage()),
        // * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
        // * if the value is a `Right` the inner value is applied to the second function.
        foldW<Error, errorCode, CaptchaImageResponse, void>(
            netErrorToErrorCode,
            res => { setCaptchaImage(some(res.img)), _uuid = some(res.uuid) }
        )
    );

    const login = async () => {

        setLoading(true);

        const userInput = pipe(
            loginParams,
            //Returns `true` if the either is an instance of `Left`, `false` otherwise.
            fromOption<errorCode>(() => 'USER')
        );

        const userInputToLoginParams = pipe(
            _uuid,
            matchW(
                () => (e: Either<errorCode, any>) => left<errorCode, LoginParams>('LOGIC'),
                uuid => map<{ userId: LoginParams['userId'], password: LoginParams['password'], code: LoginParams['code'] }, LoginParams>(param => ({
                    ...param,
                    uuid
                }))
            )
        );

        const result = await pipe(
            userInputToLoginParams(userInput),
            map(loginReq),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, LoginResponse, LoginResponse>(
                        netErrorToErrorCode,
                        right => {
                            setLoggedIn(true);
                            return right;
                        }
                    )
                )
            )
        )

        setLoading(false);

        return result;
    };

    const logout = async () => {
        setLoading(true);

        const result = pipe(
            (await logoutReq(null)()),
            foldW(
                netErrorToErrorCode,
                right => {
                    setLoggedIn(false);
                    return right;
                }
            )
        )

        setLoading(false);

        return result;
    };

    system.subscribe((s) => {
        setLoggedIn(s.isLoggedIn)
    });

    useEffect(() => { updateCaptchaImage() }, []);

    return [captchaImage, updateCaptchaImage, login, logout, isLoggedIn, isLoading, loginParams, setLoginParams];
}