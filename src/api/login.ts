import { get, post } from "@/api/base";
import { pipe } from "fp-ts/lib/function";
import { BaseResponse , CaptchaImageResponse, LoginParams, LoginResponse } from "@/types/api";

// 泛型表示请求参数以及请求回应
export const fetchCaptchaImage = pipe('/login/captchaImage',get<CaptchaImageResponse>);

export const login = pipe('/login',post<LoginParams,LoginResponse>);

export const logout = pipe('/logout',post<null,BaseResponse>);