import { Student } from "./domain/user/student";

export interface CaptchaImageResponse extends BaseResponse { img: string, uuid: string };

export interface LoginParams { userId: string, password: string, code: string, uuid: string };

export interface LoginResponse extends BaseResponse { token: string };

export type BaseResponse = { msg: string, code: number }

export interface AddStudentParams extends Student {pwd:string};

export interface QueryStudentListParams extends Student { page: number, pageNum: number };

