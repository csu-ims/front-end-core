import { phonenumber, uuid } from "../base";
import { Instructor } from "./instructor";
import { Student } from "./student";

export type User = {
    id: uuid;
    phone: phonenumber;
    email: string;
    avatar: string;
    stuInfo: Student | null;
    insInfo: Instructor | null;
}

export type UserName = Instructor['insId'] | Student['stuId'];