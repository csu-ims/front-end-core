import { pipe } from "fp-ts/lib/function";
import { get, post, put } from "./base";
import { User } from "@/types/domain/user";
import { Student } from "@/types/domain/user/student";
import { AddStudentParams, BaseResponse, QueryStudentListParams } from "@/types/api";

// 获取已登录用户信息（用户）
export const fetchUserProfile = pipe('/user/profile',get<User>);

// 新增学生
export const addStudent = pipe('/student',put<AddStudentParams,BaseResponse>)

// 修改学生信息
export const updateStudent = pipe('/student',post<Student,BaseResponse>);

// 获取学生列表
export const fetchStudentList = pipe('/student/query',get<QueryStudentListParams>);

// 获取学生信息-单条
export const fetchStudentDetail = pipe('/student/detail?stuId=',get<Student>);



