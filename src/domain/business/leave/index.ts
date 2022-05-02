import { uuid } from "../../base"
import { phonenumber , date } from "@/domain/base"

export type LeaveApplication = {
    id: uuid
    leaveType: number //此条请假请求状态
    applicantStuID: string
    applicantStuName: string
    leaveStartTime: string
    leaveEndTime: string
    leaveReason: string
    status: number
}
export type DetailedLeaveApplication = {
    id: uuid
    leaveType: number
    applicantStuID: string
    applicantStuName: string
    phoneNumber: phonenumber
    emergencyName: string
    emergencyPhoneNumber: phonenumber
    targetPlace: string
    leaveStartTime: date
    leaveEndTime: date
    leaveReason: string
    status: number
    denyReason: string
    monitorStuID: String
    InstructorInsID: string
    applyTime: date
    monitorHandleTime: date
    instructorHandleTime: date
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