import {
    fetchUserAdministrator, fetchUserProfile, updateStudent as update_student,
    addStudent as add_student, deleteStudent as delete_student, fetchStudentDetail, bindPhoneSendCode as bind_phone_send_code,
    bindPhone as bind_phone, addInstructor as add_instructor, deleteInstructor as delete_instructor,
    updateInstructor as update_instructor, addInstructorClass as add_instructor_class,
    deleteInstructorClass as delete_instructor_class, fetchInstructorDetail as fetch_instructor_detail,
    fetchInstructorList as fetch_instructor_list, addStudent_Batch as add_student_batch,
    addInstructor_Batch as add_instructor_batch, fetchStudentList as fetch_student_list,
} from "@/api/user";
import { isNone, matchW, none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { useState } from "react";
import { User } from "@/types/domain/user";
import { system } from "@/module/System";
import { Student } from "@/types/domain/user/student";
import { AddStudentParams, BindPhoneParams, BindPhoneSendCodeParams, BindPhoneSendCodeResponse, FetchUserAdministratorParams } from "@/types/api";
import { Either, foldW, fromOption, left, map, right } from "fp-ts/lib/Either";
import { errorCode } from "@/types/export";
import { netErrorToErrorCode } from "@/utils/net";
import { BaseResponse } from "@/types/api"
import { UserName } from "@/types/domain/user/index";
import { option } from "fp-ts";
import { Instructor } from "@/types/domain/user/instructor";

export default function useUser() {

    const [user, setUser] = useState<Option<User>>(none);

    // 获取已登录用户信息（用户）
    const fetchUser = async () => {
        pipe(
            (await fetchUserProfile()),
            foldW<Error, errorCode, User, void>(
                netErrorToErrorCode,
                user => system.update((s) => ({ ...s, User: some(user) }))
            )
        )
    };

    // 获取已登录用户信息（管理员）
    const [fetchAdminParams, setFetchAdminParams] = useState<Option<FetchUserAdministratorParams>>(none);
    const fetchAdmin = async () => {

        const input = pipe(
            fetchAdminParams,
            fromOption<errorCode>(() => 'USER')
        );

        const result = await pipe(
            map(fetchUserAdministrator)(input),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, User, void>(
                        netErrorToErrorCode,
                        user => system.update((s) => ({ ...s, User: some(user) }))
                    )
                )
            )
        );

        return result;
    }

    // 新增学生(参数有pwd,在哪获取)
    const [addStudentParams, setAddStudentParams] = useState<Option<AddStudentParams>>(none);
    const addStudent = async () => {

        const userInput = pipe(
            addStudentParams,
            fromOption<errorCode>(() => 'USER')
        );

        const result = await pipe(
            map(add_student)(userInput),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, BaseResponse, BaseResponse>(
                        netErrorToErrorCode,
                        right => right
                    )
                )
            )
        );

        return result;
    }

    // 修改学生信息
    const [student, setStudent] = useState<Option<Student>>(none);
    const updateStudent = async () => {

        const newStuMsg = pipe(
            student,
            fromOption<errorCode>(() => 'USER'),
        );

        const result = await pipe(
            map(update_student)(newStuMsg),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, BaseResponse, BaseResponse>(
                        netErrorToErrorCode,
                        student => {
                            system.update((s) => ({ ...s, User: { ...s.User, Student: some(student) } }));
                            return student;
                        }
                    )
                )
            )
        );

        return result;
    }

    // 获取学生列表(分页页码和每页条数是要自己输入?)
    const fetchStudentList = async () => {

    }

    // 删除学生
    const [deleteStudentParams, setDeleteStudentParams] = useState<Option<UserName>>(none);
    const deleteStudent = async () => {

        const input = pipe(
            deleteStudentParams,
            fromOption<errorCode>(() => 'USER')
        );

        const result = await pipe(
            map(delete_student)(input),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, BaseResponse, BaseResponse>(
                        netErrorToErrorCode,
                        right => right
                    )
                )
            )
        );
        return result;
    }

    // 获取学生信息-单条(怎么拼接url参数?) 两个pipe函数
    const fetchStudent = async () => pipe(
        (await fetchStudentDetail()),
        foldW<Error, errorCode, Student, void>(
            netErrorToErrorCode,
            right => right
        )
    )

    // 绑定用户手机号-发送短信验证码(用户)
    const [bindPhoneSendCodeParams, setBindPhoneSendCodeParams] = useState<Option<{ phonenumber: BindPhoneSendCodeParams['phonenumber'] }>>(none);
    // 用来保存收到的uuid
    const [_uuid, set_uuid] = useState<Option<string>>(none);
    const bindPhoneSendCode = async () => {

        const input = pipe(
            bindPhoneSendCodeParams,
            fromOption<errorCode>(() => 'USER')
        );

        // 从什么地方拿到这两个值? 阅读腾讯云api文档,这两个值从回调里面拿,如何不用html引入js库
        let ticket: Option<string> = none;
        let randstr: Option<string> = none;


        // 这里只插了一个值进去,怎么插第二个?
        const inputToParams = pipe(
            ticket,
            matchW(
                () => (e: Either<errorCode, any>) => left<errorCode, BindPhoneSendCodeParams>('LOGIC'),
                ticket => map<{ phonenumber: BindPhoneSendCodeParams['phonenumber'] }, { phonenumber: BindPhoneSendCodeParams['phonenumber'], ticket: BindPhoneSendCodeParams['ticket'] }>(params => ({
                    ...params,
                    ticket
                }))
            )

        );

        // const result = await pipe(
        //     inputToParams(input),
        //     // 上面只插入一个参数,类型不对所以报错
        //     map(bind_phone_send_code),
        //     foldW(
        //         async left => left,
        //         async right => pipe(
        //             (await right()),
        //             foldW<Error, errorCode, BindPhoneSendCodeResponse, BindPhoneSendCodeResponse>(
        //                 netErrorToErrorCode,
        //                 right => {
        //                     // 保存验证码
        //                     set_uuid(some(right.uuid));
        //                     return right;
        //                 }
        //             )
        //         )
        //     )
        // );
    };

    // 绑定用户手机号-提交(用户) 为什么要新密码和旧密码,是不是写错api了?
    const [bindPhoneParams, setBindPhoneParams] = useState<Option<BindPhoneParams>>(none);
    const bindPhone = async () => {

        const input = pipe(
            bindPhoneParams,
            fromOption<errorCode>(() => 'USER')
        );

        const inputToParams = pipe(
            _uuid,
            matchW(
                () => (e: Either<errorCode, any>) => left<errorCode, BindPhoneParams>('LOGIC'),
                uuid => map<BindPhoneParams, BindPhoneParams>(params => ({
                    ...params,
                    uuid
                })
                )
            )
        )

        const result = await pipe(
            inputToParams(input),
            map(bind_phone),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, BaseResponse, BaseResponse>(
                        netErrorToErrorCode,
                        right => right
                    )
                )
            )
        );

        return result;
    }

    // 新增辅导员
    const [addInstructorParams, setAddInstructorParams] = useState<Option<Instructor>>(none);
    const addInstructor = async () => {

        const input = pipe(
            addInstructorParams,
            fromOption<errorCode>(() => 'USER')
        )

        const result = await pipe(
            map(add_instructor)(input),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, BaseResponse, BaseResponse>(
                        netErrorToErrorCode,
                        right => right
                    )
                )
            )
        );

        return result;
    }

    // 删除辅导员
    const [deleteInstructorParams, setDeleteInstructorParams] = useState<Option<Instructor['insId']>>(none);
    const deleteInstructor = async () => {

        // 参数也是用户输入吗?
        const input = pipe(
            deleteInstructorParams,
            fromOption<errorCode>(() => 'USER')
        )

        const result = await pipe(
            map(delete_instructor)(input),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, BaseResponse, BaseResponse>(
                        netErrorToErrorCode,
                        right => right
                    )
                )
            )
        );

        return result;
    }

    // 修改辅导员信息
    const [updateInstructorParams, setUpdateInstructorParams] = useState<Option<Instructor>>(none);
    const updateInstructor = async () => {

        const input = pipe(
            updateInstructorParams,
            fromOption<errorCode>(() => 'USER')
        )

        const result = pipe(
            map(update_instructor)(input),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, BaseResponse, BaseResponse>(
                        netErrorToErrorCode,
                        right => right
                    )
                )
            )
        );

        return result;
    }

    // 添加管理员管理的班级
    const [addInstructorClassParams, setAddInstructorClassParams] = useState<Option<{ insId: Instructor['insId'], classes: Instructor['classes'] }>>(none);
    const addInstructorClass = async () => {
        const input = pipe(
            addInstructorClassParams,
            fromOption<errorCode>(() => 'USER')
        )

        const result = pipe(
            map(add_instructor_class)(input),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, BaseResponse, BaseResponse>(
                        netErrorToErrorCode,
                        right => right
                    )
                )
            )
        )

        return result;
    }

    // 删除管理员管理的班级
    const [deleteInstructorClassParams, setDeleteInstructorClassParams] = useState<Option<{ insId: Instructor['insId'], classes: Instructor['classes'] }>>(none);
    const deleteInstructorClass = async () => {

        const input = pipe(
            addInstructorClassParams,
            fromOption<errorCode>(() => 'USER')
        )

        const result = pipe(
            map(add_instructor_class)(input),
            foldW(
                async left => left,
                async right => pipe(
                    (await right()),
                    foldW<Error, errorCode, BaseResponse, BaseResponse>(
                        netErrorToErrorCode,
                        right => right
                    )
                )
            )
        )

        return result;
    }

    // 获取辅导员信息-单条详情(把insId放在query里面,insId从哪里拿?)
    const [fetchInstructorDetailParams, setFetchInstructorDetailParams] = useState<Option<Instructor['insId']>>(none);
    const fetchInstructorDetail = async () => {

        // 是从system里面拿insId吗还是用户输入?
        setFetchInstructorDetailParams(some('insId'));


    }

    //获取辅导员列表-条件查询(get也有body?)
    const [fetchInstructorListParams, setFetchInstructorListParams] = useState<Option<Instructor>>(none);


    // 批量新增学生
    const [addStudent_BatchParams, setAddStudent_BatchParams] = useState<Option<Student[]>>(none);
    const addStudent_Batch = async () => {
        // 前端的任务是传输文件还是读取文件?
    }

    // 批量新增辅导员(同上)
    const [addInstructor_BatchParams, setAddInstructor_BatchParams] = useState<Option<Instructor[]>>(none);
    const addInstructor_Batch = async () => {

    }

    // 修改用户头像(post方法的参数为什么放在query里面?)
    const [updateUserAvatarParams, setUpdateUserAvatarParams] = useState<Option<{ avatar: User['avatar'] }>>(none);
    const updateUserAvatar = async () => {

    }






    system.subscribe((s) => {
        if (isNone(s.User)) {
            // 这里报错没看懂,先注释掉
            // fetch();
            return;
        }
        setUser(s.User);
    });

    return [user];
}