import { pipe } from "fp-ts/lib/function";
import { get, mydelete, post, put } from "./base";
import { User } from "@/types/domain/user";
import { Student } from "@/types/domain/user/student";
import { Instructor } from "@/types/domain/user/instructor";
import {
    AddStudentParams, BaseResponse, BindPhoneParams, BindPhoneSendCodeParams,
    BindPhoneSendCodeResponse, FetchUserAdministratorParams, QueryStudentListParams
} from "@/types/api";

// 获取已登录用户信息（用户）
export const fetchUserProfile = pipe('/user/profile', get<User>);

// 获取用户信息(管理员) 为什么请求参数是学生学号+辅导员工号 返回值也是User?
export const fetchUserAdministrator = pipe('/user/detail', post<FetchUserAdministratorParams, User>);

// 新增学生
export const addStudent = pipe('/student', put<AddStudentParams, BaseResponse>)

// 修改学生信息
export const updateStudent = pipe('/student', post<Student, BaseResponse>);

// 获取学生列表-条件查询(文档有误?get有body吗?)
export const fetchStudentList = pipe('/student/query', post<QueryStudentListParams,QueryStudentListParams[]>);

// 删除学生(返回值?)
export const deleteStudent = pipe('/student', mydelete<Student['stuId'], BaseResponse>);

// 获取学生信息-单条(url拼接参数不会)
export const fetchStudentDetail = pipe('/student/detail?stuId=', get<Student>);

// 绑定用户手机号 - 发送短信验证码（用户）
export const bindPhoneSendCode = pipe('/sms/send/bind', post<BindPhoneSendCodeParams, BindPhoneSendCodeResponse>);

// 绑定用户手机号 - 提交（用户）
export const bindPhone = pipe('/user/bind/phone', post<BindPhoneParams, BaseResponse>);

// 新增辅导员
export const addInstructor = pipe('/instructor', put<Instructor, BaseResponse>)

// 删除辅导员
export const deleteInstructor = pipe('/instructor', mydelete<Instructor['insId'], BaseResponse>);

// 修改辅导员信息
export const updateInstructor = pipe('/instructor', post<Instructor, BaseResponse>);

// 添加辅导员管理的班级
export const addInstructorClass = pipe('/instructor/class', put<{ insId: Instructor['insId'], classes: Instructor['classes'] }, BaseResponse>)

// 删除辅导员管理的班级
export const deleteInstructorClass = pipe('/instructor/class', mydelete<{ insId: Instructor['insId'], classes: Instructor['classes'] }, BaseResponse>)

// 获取辅导员信息-单条详情(把insId放在query里面)
export const fetchInstructorDetail = pipe('/instructor/detail', get<Instructor>);

// 获取辅导员列表 - 条件查询(文档有误?)
export const fetchInstructorList = pipe('/instructor/query', get<Instructor[]>);

// 批量新增学生(参数类型是file,不会写,暂时先写成student数组)
export const addStudent_Batch = pipe('/student/batch', put<Student[], BaseResponse>);

// 批量新增辅导员(同上)
export const addInstructor_Batch = pipe('/instructor/batch', put<Instructor[], BaseResponse>);

// 修改用户头像(位置在query什么意思?post的参数不放在body里面?此处参数名不能为url,与文档冲突)
export const updateUserAvatar = pipe('/user/avatar', post<User['avatar'], BaseResponse>);

