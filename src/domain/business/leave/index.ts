import { uuid } from "../../base"
import { phonenumber } from "@/domain/base"

export type LeaveApplication = {
    id: uuid
    phonenumber: phonenumber
    emergencyPerson: string
    emergencyContact: phonenumber
    place: string // 外出地点
    startTime: Date
    endTime: Date
    reason: string
}
const Leaveapplies:LeaveApplication[] = [];
//获取请假列表的请求参数
export type Get_leave_query = {
    input: number
    pageSize: number
    selectStatus: number
    Authorization: string
}
export {Leaveapplies}