import { get, post } from "@/api/base";
import { pipe } from "fp-ts/lib/function";
import { BaseResponse , CaptchaImageResponse, LoginParams, LoginResponse } from "@/types/api";

export const fetchCaptchaImage = pipe('/login/captchaImage',get<CaptchaImageResponse>);

export const login = pipe('/login',post<LoginParams,LoginResponse>);

export const logout = pipe('/logout',post<null,BaseResponse>);