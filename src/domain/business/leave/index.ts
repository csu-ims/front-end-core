import { uuid } from "../../base"
import { phonenumber , date , authorization } from "@/domain/base"
//单个请假请求
export type LeaveApplication = {
    id: uuid
    leaveType: number //该请假请求状态(审批进度)
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
const DetailedLeaveapplies: DetailedLeaveApplication[] = [];

//发送请假列表的请求参数
export type Post_leave_query = {
    id: null
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
    submitted: boolean
    deleted: boolean
}
//获取请假列表的请求参数
export type Get_leave_query = {
    input: number
    pageSize: number
    selectStatus: number
    Authorization: authorization
}
export type Get_detailed_leave_query = {
    applyUUID: uuid
    Authorization: authorization
}
export type handlequery = {
    uuid: uuid
    pass: boolean
    denyReason: string
}
export {Leaveapplies,DetailedLeaveapplies,}