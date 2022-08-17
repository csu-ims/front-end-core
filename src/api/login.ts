import { get } from "@/api/base";

export type CaptchaImageResponse = { msg: string, img: string, code: number, uuid: string };

export const fetchCaptchaImage = ()=>get('/login/captchaImage'); 

