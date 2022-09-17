
import { Student } from "./domain/user/student";
import { Instructor } from "./domain/user/instructor";

export interface CaptchaImageResponse extends BaseResponse { img: string, uuid: string };

export interface LoginParams { userId: string, password: string, code: string, uuid: string };

export interface LoginResponse extends BaseResponse { token: string };

export type BaseResponse = { msg: string, code: number }

export interface AddStudentParams extends Student { pwd: string };

export interface QueryStudentListParams extends Student { page: number, pageNum: number };

export type BindPhoneSendCodeParams = { phonenumber: string, ticket: string, randstr: string };

export interface BindPhoneSendCodeResponse extends BaseResponse { uuid: string };

export type BindPhoneParams = { phonenumber: string, code: string, uuid: string };

export interface AddInstructorParams extends Instructor { pwd: string };

export type FetchUserAdministratorParams = { userId: Student['stuId'], insId: Instructor['insId'] };

