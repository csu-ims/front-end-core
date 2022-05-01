import { phonenumber, uuid } from "../../utils/type";

export type Student = {
    stuId: string;
    classId: uuid;
    name: string;
    idNumber: string;
    qqNumber: string;
    address: string;
    politicsStatus: string;
    dadName: string;
    dadPhone: phonenumber;
    momName: string;
    monPhone: phonenumber;
    mark: string;
}