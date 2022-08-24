import { fetchUserProfile, updateStudent } from "@/api/user";
import { isNone, none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/function";
import { useState } from "react";
import { User } from "@/types/domain/user";
import { assumeRight } from "@/utils/either";
import { system } from "@/module/System";
import { Student } from "@/types/domain/user/student";
import { getOrElse } from "fp-ts/lib/Option";
import { AddStudentParams } from "@/types/api";

export default function useUser() {

    // 获取学生信息
    const [user, setUser] = useState<Option<User>>(none);
    const fetch = async () => {
        pipe(
            (await fetchUserProfile()),
            assumeRight(),
            user => system.update((s) => ({ ...s, User: some(user) }))
        );
    };

    // 更新学生信息
    const [student, setStudent] = useState<Option<Student>>(none);
    const update = async () => {

        const params = pipe(
            student,
            getOrElse<Student>(() => { throw Error("updateStudentParams is none") })
        )

        pipe(
            (await updateStudent(params)()),
            assumeRight(),
            student => system.update((s) => ({ ...s,User:{...s.User,stuInfo:student}}))
        )
    }

    // 新增学生(参数有pwd,在哪获取)
    const [addStudentParams,setAddStudentParams] = useState<Option<AddStudentParams>>(none);
    const add = async () =>{
        
    }

    // 获取学生信息-单条(参数在url的写法不会)


    system.subscribe((s) => {
        if (isNone(s.User)) {
            fetch();
            return;
        }
        setUser(s.User);
    });

    return [user];
}