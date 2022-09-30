import { useState, useEffect } from "react";
import { fetchCaptchaImage, login as loginReq, logout as logoutReq } from "@/api/login";
import { system } from "@/module/System";
import { CaptchaImageResponse, LoginParams, LoginResponse } from "@/types/api";
import { pipe } from "fp-ts/lib/function";
import { none, Option, some, matchW } from "fp-ts/lib/Option";
import { imgBase64string } from "@/types/domain/base";
import { Either, foldW, left, map, fromPredicate } from "fp-ts/lib/Either";
import { errorCode } from "@/types/export";
import { netErrorToErrorCode } from "@/utils/net";

type loginParams = { userId: LoginParams['userId'], password: LoginParams['password'], code: LoginParams['code'] };

export default function useLogin() {

    let _uuid: Option<string> = none;
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [loginParams, setLoginParams] = useState<loginParams | null>(null);
    const [captchaImage, setCaptchaImage] = useState<imgBase64string | null>(null);

    const updateCaptchaImage = async () => pipe(
        (await fetchCaptchaImage()),
        foldW<Error, errorCode, CaptchaImageResponse, void>(
            netErrorToErrorCode,
            res => { setCaptchaImage(res.img), _uuid = some(res.uuid) }
        )
    );

    const login = async () => {

        setLoading(true);

        const userInput = pipe(
            loginParams,
            fromPredicate( 
                p => p !== null ,
                ():errorCode => 'USER'
            ),
        ) as unknown as Either<errorCode,loginParams>;

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