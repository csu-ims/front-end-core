import { phonenumber, uuid } from "../../utils/type";
import { Instructor } from "./instructor";
import { Student } from "./student";

export type User = {
    id: uuid;
    pwd:string;
    phone: phonenumber;
    email: string;
    avatar: string;
    stuInfo: Student | null;
    insInfo: Instructor | null;
}

export type UserName = Instructor['insId'] | Student['stuId'];